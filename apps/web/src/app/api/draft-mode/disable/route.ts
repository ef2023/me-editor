import {draftMode} from 'next/headers';
import {NextResponse} from 'next/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function GET() {
  (await draftMode()).disable();

  return NextResponse.redirect(new URL('/', siteUrl));
}