import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = {
  _type?: string;
  slug?: string;
  categorySlug?: string;
  path?: string | null;
};

const TAGS_BY_TYPE: Record<string, string[]> = {
  post: ['post', 'category', 'author', 'homePage'],
  category: ['category', 'post', 'homePage'],
  author: ['author', 'post', 'homePage'],
  legalPage: ['legalPage'],
  siteSettings: ['siteSettings', 'homePage'],
  homePage: ['homePage', 'post', 'category', 'author'],
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', {
        status: 500,
      });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({
          message: 'Invalid signature',
          body,
        }),
        { status: 401 },
      );
    }

    if (!body?._type) {
      return new Response(
        JSON.stringify({
          message: 'Bad Request',
          body,
        }),
        { status: 400 },
      );
    }

    const tags = TAGS_BY_TYPE[body._type] ?? [body._type];

    for (const tag of tags) {
      revalidateTag(tag, 'max');
    }

    if (body.path) {
      revalidatePath(body.path);
    }

    const tiposQueAfetamAHome = ['post', 'category', 'siteSettings', 'homePage'];
    if (tiposQueAfetamAHome.includes(body._type)) {
      revalidatePath('/');
    }

    if (body._type === 'siteSettings') {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      path: body.path ?? null,
      tags,
      source: 'Sanity Webhook',
    });
  } catch (error) {
    console.error('Webhook Error:', error);

    return new Response(
      error instanceof Error ? error.message : 'Unexpected error',
      { status: 500 },
    );
  }
}