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
    return NextResponse.redirect(`${base}/newsletter/confirm?status=invalid`);
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
    return NextResponse.redirect(`${base}/newsletter/confirm?status=missing`);
  }

  const isExpired = new Date(data.expiresAt).getTime() < Date.now();
  const isValid = data.tokenHash === hashValue(token);

  if (!isValid || isExpired) {
    return NextResponse.redirect(`${base}/newsletter/confirm?status=expired`);
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

  await writeClient.patch(data._id).set({
    status: 'confirmed',
    confirmedAt: now,
  }).commit();

  return NextResponse.redirect(`${base}/newsletter/confirm?status=confirmed`);
}