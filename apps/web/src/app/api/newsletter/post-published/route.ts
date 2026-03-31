import {NextRequest, NextResponse} from 'next/server';
import {Resend} from 'resend';
import {sanityFetch} from '@/lib/sanity/fetch';
import {postNewsletterByIdQuery} from '@/lib/sanity/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type WebhookPayload = {
  _id?: string;
  _type?: string;
};

type Subscriber = {
  email: string;
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

const BATCH_SIZE = 50;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildPostUrl(siteUrl: string, categorySlug?: string, slug?: string) {
  const base = siteUrl.replace(/\/$/, '');

  if (!categorySlug || !slug) {
    return base;
  }

  return `${base}/${categorySlug}/${slug}`;
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

function dedupeEmails(subscribers: Subscriber[]) {
  return [...new Set(
    subscribers
      .map((subscriber) => subscriber.email.trim().toLowerCase())
      .filter(Boolean),
  )];
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function buildHtmlEmail(post: PostNewsletterData, postUrl: string, teaser: string) {
  const safeTitle = escapeHtml(post.title);
  const safeTeaser = escapeHtml(teaser);
  const safeUrl = escapeHtml(postUrl);

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1a1c1e; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6c757d;">
        Mistério do Evangelho
      </p>

      <h1 style="margin: 0 0 16px; font-size: 28px; line-height: 1.2; color: #1a1c1e;">
        ${safeTitle}
      </h1>

      <p style="margin: 0 0 24px; font-size: 16px; color: #444;">
        ${safeTeaser}
      </p>

      <p style="margin: 0 0 24px;">
        <a
          href="${safeUrl}"
          style="display: inline-block; padding: 12px 18px; background: #1a1c1e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700;"
        >
          Ler o artigo
        </a>
      </p>

      <p style="margin: 24px 0 0; font-size: 14px; color: #6c757d;">
        Você está recebendo este e-mail porque se inscreveu na newsletter do portal.
      </p>
    </div>
  `;
}

function buildTextEmail(post: PostNewsletterData, postUrl: string, teaser: string) {
  return [
    'Mistério do Evangelho',
    '',
    post.title,
    '',
    teaser,
    '',
    `Leia o artigo: ${postUrl}`,
    '',
    'Você está recebendo este e-mail porque se inscreveu na newsletter do portal.',
  ].join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = getRequiredEnv('RESEND_API_KEY');
    const fromEmail = getRequiredEnv('RESEND_FROM_EMAIL');
    const siteUrl = getRequiredEnv('NEXT_PUBLIC_SITE_URL');

    const resend = new Resend(resendApiKey);

    const body = (await request.json().catch(() => ({}))) as WebhookPayload;
    const postId = body._id?.trim();

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

    const {data: subscribers} = await sanityFetch<Subscriber[]>({
      query: `
        *[_type == "newsletterSubscriber" && status == "active" && defined(email)]{
          email
        }
      `,
      tags: ['newsletterSubscriber'],
      revalidate: 0,
    });

    const recipientList = dedupeEmails(subscribers ?? []);

    if (recipientList.length === 0) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: 'Nenhum inscrito ativo encontrado.',
      });
    }

    const subject = buildEmailSubject(post);
    const teaser = buildEmailTeaser(post);
    const postUrl = buildPostUrl(siteUrl, post.categorySlug, post.slug);
    const html = buildHtmlEmail(post, postUrl, teaser);
    const text = buildTextEmail(post, postUrl, teaser);

    const batches = chunkArray(recipientList, BATCH_SIZE);
    const results: unknown[] = [];

    for (const batch of batches) {
      const response = await resend.emails.send({
        from: fromEmail,
        to: batch,
        subject,
        html,
        text,
      });

      results.push(response);
    }

    return NextResponse.json({
      ok: true,
      sentBatches: batches.length,
      recipients: recipientList.length,
      postId: post._id,
      postTitle: post.title,
      results,
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