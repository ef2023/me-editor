import {NextResponse} from 'next/server';
import {newsletterPendingByEmailQuery} from '@/lib/sanity/queries';
import {sanityFetch} from '@/lib/sanity/fetch';
import {writeClient} from '@/lib/sanity/write-client';
import {buildSubscriberId, hashValue, normalizeEmail} from '@/lib/newsletter';

type PendingDoc = {
  _id: string;
  email: string;
  tokenHash: string;
  status: string;
  expiresAt: string;
};

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const email = normalizeEmail(searchParams.get('email') ?? '');
  const token = searchParams.get('token') ?? '';

  const base =
    process.env.NEWSLETTER_CONFIRM_REDIRECT_BASE ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  if (!email || !token || !process.env.SANITY_WRITE_TOKEN) {
    const redirectUrl = new URL('/newsletter/confirm', base);
    redirectUrl.searchParams.set('status', 'invalid');

    return NextResponse.redirect(redirectUrl);
  }

  const {data} = await sanityFetch<PendingDoc | null>({
    query: newsletterPendingByEmailQuery,
    params: {email},
    revalidate: false,
    tags: [],
    perspective: 'raw',
    stega: false,
  });

  if (!data) {
    const redirectUrl = new URL('/newsletter/confirm', base);
    redirectUrl.searchParams.set('status', 'missing');

    return NextResponse.redirect(redirectUrl);
  }

  const isExpired = new Date(data.expiresAt).getTime() < Date.now();
  const isValid = data.tokenHash === hashValue(token);

  if (!isValid || isExpired) {
    const redirectUrl = new URL('/newsletter/confirm', base);
    redirectUrl.searchParams.set('status', 'expired');

    return NextResponse.redirect(redirectUrl);
  }

  const subscriberId = buildSubscriberId(email);
  const now = new Date().toISOString();

  await writeClient.createIfNotExists({
    _id: subscriberId,
    _type: 'newsletterSubscriber',
    email,
    source: 'home',
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

  const redirectUrl = new URL('/newsletter/confirm', base);
  redirectUrl.searchParams.set('status', 'confirmed');

  return NextResponse.redirect(redirectUrl);
}