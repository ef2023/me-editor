import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { getLegalPageBySlug } from '@/lib/content-source';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageBySlug('contato');

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: '/contato',
  });
}

export default async function ContatoPage() {
  const content = await getLegalPageBySlug('contato');
  return <LegalPage content={content} />;
}