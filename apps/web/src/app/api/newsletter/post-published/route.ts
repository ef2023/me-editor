import {NextRequest, NextResponse} from 'next/server';
import {parseBody} from 'next-sanity/webhook';
import {writeClient} from '@/lib/sanity/write-client';
import {postNewsletterByIdQuery} from '@/lib/sanity/queries';
import {sendNewPostBroadcast} from '@/lib/resend-newsletter';

type WebhookPayload = {
  _id?: string;
  _type?: string;
};

type NewsletterPostDoc = {
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

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_NEWSLETTER_WEBHOOK_SECRET;

    if (!secret) {
      return new Response(
        'Missing environment variable SANITY_NEWSLETTER_WEBHOOK_SECRET',
        {status: 500},
      );
    }

    const {isValidSignature, body} = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json(
        {message: 'Invalid signature'},
        {status: 401},
      );
    }

    if (body?._type !== 'post' || !body._id) {
      return NextResponse.json(
        {message: 'Skipped: not a valid post payload'},
        {status: 200},
      );
    }

    const post = await writeClient.fetch<NewsletterPostDoc | null>(
      postNewsletterByIdQuery,
      {id: body._id},
    );

    if (!post || !post.slug || !post.categorySlug) {
      return NextResponse.json(
        {message: 'Skipped: post not found or incomplete'},
        {status: 200},
      );
    }

    if (!post.newsletter?.sendOnPublish) {
      return NextResponse.json(
        {message: 'Skipped: sendOnPublish is false'},
        {status: 200},
      );
    }

    if (post.newsletter.sentAt || post.newsletter.broadcastId) {
      return NextResponse.json(
        {message: 'Skipped: newsletter already sent'},
        {status: 200},
      );
    }

    const broadcastId = await sendNewPostBroadcast({
      title: post.title,
      slug: post.slug,
      categorySlug: post.categorySlug,
      excerpt: post.excerpt,
      subject: post.newsletter.subject,
      teaser: post.newsletter.teaser,
    });

    const now = new Date().toISOString();

    await writeClient
      .patch(post._id)
      .set({
        newsletter: {
          ...(post.newsletter ?? {}),
          sendOnPublish: post.newsletter?.sendOnPublish ?? false,
          subject: post.newsletter?.subject,
          teaser: post.newsletter?.teaser,
          sentAt: now,
          broadcastId,
        },
      })
      .commit();

    return NextResponse.json({
      ok: true,
      broadcastId,
      sentAt: now,
    });
  } catch (error) {
    console.error('Newsletter post webhook failed:', error);

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : 'Unexpected error',
      },
      {status: 500},
    );
  }
}