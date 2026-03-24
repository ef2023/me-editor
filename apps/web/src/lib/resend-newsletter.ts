import {Resend} from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type NewsletterPostPayload = {
  title: string;
  slug: string;
  categorySlug: string;
  excerpt?: string;
  subject?: string;
  teaser?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }

  return value;
}

function maybeDuplicateError(error: unknown) {
  const message =
    error instanceof Error ? error.message : String(error ?? '');

  return /already|exists|duplicate/i.test(message);
}

export async function ensureContactInNewsletterSegment(email: string) {
  if (!resend) {
    throw new Error('Resend client is not configured');
  }

  const segmentId = requiredEnv('RESEND_NEWSLETTER_SEGMENT_ID');

  const {error: createError} = await resend.contacts.create({
    email,
    unsubscribed: false,
  });

  if (createError && !maybeDuplicateError(createError)) {
    throw createError;
  }

  const {error: segmentError} = await resend.contacts.segments.add({
    email,
    segmentId,
  });

  if (segmentError && !maybeDuplicateError(segmentError)) {
    throw segmentError;
  }
}

export async function sendNewPostBroadcast(post: NewsletterPostPayload) {
  if (!resend) {
    throw new Error('Resend client is not configured');
  }

  const segmentId = requiredEnv('RESEND_NEWSLETTER_SEGMENT_ID');
  const from = requiredEnv('RESEND_FROM_EMAIL');
  const siteUrl = requiredEnv('NEXT_PUBLIC_SITE_URL');

  const postUrl = new URL(
    `/${post.categorySlug}/${post.slug}`,
    siteUrl,
  ).toString();

  const subject =
    post.subject?.trim() || `Novo conteúdo: ${post.title}`;

  const teaser =
    post.teaser?.trim() ||
    post.excerpt?.trim() ||
    'Um novo conteúdo editorial foi publicado no portal.';

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1d1d1d">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#666;margin:0 0 12px">
        Mistério do Evangelho
      </p>
      <h1 style="font-size:24px;margin:0 0 12px">${post.title}</h1>
      <p style="margin:0 0 18px">${teaser}</p>
      <p style="margin:0 0 18px">
        <a href="${postUrl}" style="display:inline-block;padding:12px 18px;background:#171717;color:#fff;text-decoration:none;border-radius:6px">
          Ler conteúdo
        </a>
      </p>
      <p style="font-size:13px;color:#666">
        Para sair desta lista, use: {{{RESEND_UNSUBSCRIBE_URL}}}
      </p>
    </div>
  `;

  const text = `${post.title}\n\n${teaser}\n\nLeia: ${postUrl}\n\nCancelar inscrição: {{{RESEND_UNSUBSCRIBE_URL}}}`;

  const {data, error} = await resend.broadcasts.create({
    segmentId,
    from,
    subject,
    html,
    text,
    name: `post-${post.slug}`,
    send: true,
  });

  if (error || !data?.id) {
    throw error ?? new Error('Failed to create/send broadcast');
  }

  return data.id;
}