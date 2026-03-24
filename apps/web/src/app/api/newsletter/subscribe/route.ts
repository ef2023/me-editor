import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {writeClient} from '@/lib/sanity/write-client';
import {
  buildPendingId,
  createNewsletterToken,
  hashValue,
  isValidEmail,
  normalizeEmail,
} from '@/lib/newsletter';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = normalizeEmail(String(formData.get('email') ?? ''));
  const redirectTo = String(formData.get('redirectTo') ?? '/');
  const source = String(formData.get('source') ?? 'home');

  const baseUrl =
    process.env.NEWSLETTER_CONFIRM_REDIRECT_BASE ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000';

  if (!email || !isValidEmail(email)) {
    const redirectUrl = new URL(redirectTo || '/', baseUrl);
    redirectUrl.searchParams.set('newsletter', 'invalid');

    return NextResponse.redirect(redirectUrl);
  }

  if (!process.env.SANITY_WRITE_TOKEN || !resend || !process.env.RESEND_FROM_EMAIL) {
    const redirectUrl = new URL(redirectTo || '/', baseUrl);
    redirectUrl.searchParams.set('newsletter', 'error');

    return NextResponse.redirect(redirectUrl);
  }

  const token = createNewsletterToken();
  const tokenHash = hashValue(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24).toISOString();
  const _id = buildPendingId(email);

  await writeClient.createOrReplace({
    _id,
    _type: 'newsletterPendingSubscriber',
    email,
    source,
    status: 'pending',
    tokenHash,
    createdAt: now.toISOString(),
    expiresAt,
  });

  const confirmUrl = new URL('/api/newsletter/confirm', baseUrl);
  confirmUrl.searchParams.set('email', email);
  confirmUrl.searchParams.set('token', token);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: email,
    subject: 'Confirme sua inscrição na newsletter',
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1d1d1d">
        <h1 style="font-size:24px;margin-bottom:12px">Confirme sua inscrição</h1>
        <p>Recebemos seu pedido para entrar na newsletter do Mistério do Evangelho.</p>
        <p>
          <a href="${confirmUrl}" style="display:inline-block;padding:12px 18px;background:#171717;color:#fff;text-decoration:none;border-radius:6px">
            Confirmar inscrição
          </a>
        </p>
        <p>Se você não fez esse pedido, ignore esta mensagem.</p>
      </div>
    `,
  });

  const redirectUrl = new URL(redirectTo || '/', baseUrl);
  redirectUrl.searchParams.set('newsletter', 'pending');

  return NextResponse.redirect(redirectUrl);
}