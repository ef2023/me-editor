import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {newsletterPendingByEmailQuery} from '@/lib/sanity/queries';
import {writeClient} from '@/lib/sanity/write-client';
import {
  buildSubscriberId,
  hashValue,
  normalizeEmail,
} from '@/lib/newsletter';
import {ensureContactInNewsletterSegment} from '@/lib/resend-newsletter';

type PendingDoc = {
  _id: string;
  email: string;
  tokenHash: string;
  status: 'pending' | 'confirmed' | 'expired' | 'invalid';
  expiresAt: string;
  source?: string;
};

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function redirectWithStatus(
  baseUrl: string,
  status: 'confirmed' | 'invalid' | 'missing' | 'expired',
) {
  const redirectUrl = new URL('/newsletter/confirm', baseUrl);
  redirectUrl.searchParams.set('status', status);

  return NextResponse.redirect(redirectUrl, {status: 303});
}

export async function GET(request: Request) {
  const baseUrl =
    process.env.NEWSLETTER_CONFIRM_REDIRECT_BASE ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  try {
    const {searchParams} = new URL(request.url);
    const email = normalizeEmail(searchParams.get('email') ?? '');
    const token = searchParams.get('token') ?? '';

    if (!email || !token || !process.env.SANITY_WRITE_TOKEN) {
      return redirectWithStatus(baseUrl, 'invalid');
    }

    const data = await writeClient.fetch<PendingDoc | null>(
      newsletterPendingByEmailQuery,
      {email},
    );

    if (!data || data.status !== 'pending') {
      return redirectWithStatus(baseUrl, 'missing');
    }

    const isExpired = new Date(data.expiresAt).getTime() < Date.now();
    const isValid = data.tokenHash === hashValue(token);

    if (!isValid) {
      return redirectWithStatus(baseUrl, 'invalid');
    }

    if (isExpired) {
      return redirectWithStatus(baseUrl, 'expired');
    }

    const subscriberId = buildSubscriberId(email);
    const now = new Date().toISOString();

    await writeClient.createIfNotExists({
      _id: subscriberId,
      _type: 'newsletterSubscriber',
      email,
      source: data.source ?? 'home',
      status: 'active',
      subscribedAt: now,
      confirmedAt: now,
    });

    await writeClient
      .patch(data._id)
      .set({
        status: 'confirmed',
        confirmedAt: now,
      })
      .commit();

  try {
    await ensureContactInNewsletterSegment(email);
  } catch (error) {
    console.error('Falha ao sincronizar contato confirmado no segmento:', error);
  }

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: 'Bem-vindo à newsletter do Mistério do Evangelho',
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1d1d1d">
            <h1 style="font-size:24px;margin-bottom:12px">Inscrição confirmada</h1>
            <p>Seja bem-vindo à newsletter do Mistério do Evangelho.</p>
            <p>Você passará a receber novidades editoriais, novos conteúdos e comunicados relevantes do portal.</p>
            <p>
              <a href="${baseUrl}" style="display:inline-block;padding:12px 18px;background:#171717;color:#fff;text-decoration:none;border-radius:6px">
                Acessar o portal
              </a>
            </p>
          </div>
        `,
      });
}
