import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {EsbocoShell} from '@/components/esboco/esboco-shell';
import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';
import {getEsbocoBySlug} from '@/lib/content-source';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const esboco = await getEsbocoBySlug(slug);

  if (!esboco) {
    return {
      title: 'Esboço não encontrado | Mistério do Evangelho',
      description: 'O esboço solicitado não foi encontrado.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const canonicalUrl = new URL(`/esbocos/${esboco.slug}`, siteUrl).toString();

  return {
    title: esboco.seoTitle ?? esboco.title,
    description: esboco.seoDescription ?? esboco.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function EsbocoPage({params}: PageProps) {
  const {slug} = await params;
  const esboco = await getEsbocoBySlug(slug);

  if (!esboco) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main>
        <EsbocoShell esboco={esboco} />
      </main>
      <SiteFooter />
    </>
  );
}