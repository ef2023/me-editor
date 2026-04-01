import {NextRequest, NextResponse} from 'next/server';
import {parseBody} from 'next-sanity/webhook';
import {sanityFetch} from '@/lib/sanity/fetch';
import {postNewsletterByIdQuery} from '@/lib/sanity/queries';
import {sendNewPostBroadcast} from '@/lib/resend-newsletter';
import {writeClient} from '@/lib/sanity/write-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type WebhookPayload = {
  _id?: string;
  _type?: string;
};

type PostNewsletterData = {
  _id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  categorySlug?: string;
  newsletter?: {
    sendOnPublish?: boolean;
    subject?: string;
    teaser?: string;
    sentAt?: string;
    broadcastId?: string;
  };
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }

  return value;
}

function buildEmailSubject(post: PostNewsletterData) {
  const customSubject = post.newsletter?.subject?.trim();

  if (customSubject) {
    return customSubject;
  }

  return `Novo artigo: ${post.title}`;
}

function buildEmailTeaser(post: PostNewsletterData) {
  const customTeaser = post.newsletter?.teaser?.trim();

  if (customTeaser) {
    return customTeaser;
  }

  return (
    post.excerpt?.trim() ||
    'Um novo conteúdo foi publicado no portal Mistério do Evangelho.'
  );
}

export async function POST(request: NextRequest) {
  try {

    if (!secret) {
      throw new Error(
        'Variável de ambiente ausente: NEWSLETTER_WEBHOOK_SECRET (ou SANITY_REVALIDATE_SECRET como fallback).',
      );
    }

    const {isValidSignature, body} = await parseBody<WebhookPayload>(request, secret);

    if (!postId) {
      return NextResponse.json(
        {ok: false, error: 'Payload do webhook sem _id do post.'},
        {status: 400},
      );
    }

    const {data: post} = await sanityFetch<PostNewsletterData | null>({
      query: postNewsletterByIdQuery,
      params: {id: postId},
      tags: ['post'],
      revalidate: 0,
    });

    if (!post) {
      return NextResponse.json(
        {ok: false, error: 'Post não encontrado no Sanity.'},
        {status: 404},
      );
    }

    if (!post.newsletter?.sendOnPublish) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: 'newsletter.sendOnPublish está desativado para este post.',
      });
    }

    if (post.newsletter?.sentAt) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: 'Este post já foi marcado como enviado anteriormente.',
      });
    }

    const subject = buildEmailSubject(post);
    const teaser = buildEmailTeaser(post);

    if (!post.slug || !post.categorySlug) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Post sem slug/categoria para envio de broadcast.',
        },
        {status: 422},
      );
    }

    const broadcastId = await sendNewPostBroadcast({
      title: post.title,
      slug: post.slug,
      categorySlug: post.categorySlug,
      excerpt: post.excerpt,
      subject,
      teaser,
    });
    const now = new Date().toISOString();

    await writeClient
      .patch(post._id)
      .set({
        'newsletter.sentAt': now,
        'newsletter.broadcastId': broadcastId,
      })
      .commit();

    return NextResponse.json({
      ok: true,
      postId: post._id,
      postTitle: post.title,
      broadcastId,
      sentAt: now,
    });
  } catch (error) {
    console.error('Erro ao enviar newsletter de post publicado:', error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno ao enviar os e-mails da newsletter.',
      },
      {status: 500},
    );
  }
}
