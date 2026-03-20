import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { getLegalPageBySlug } from '@/lib/content-source';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageBySlug('sobre');

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: '/sobre',
  });
}

export default async function SobrePage() {
  const content = await getLegalPageBySlug('sobre');
  return <LegalPage content={content} />;
}