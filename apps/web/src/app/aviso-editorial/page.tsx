import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { getLegalPageBySlug } from '@/lib/content-source';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageBySlug('aviso-editorial');

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: '/aviso-editorial',
  });
}

export default async function AvisoEditorialPage() {
  const content = await getLegalPageBySlug('aviso-editorial');
  return <LegalPage content={content} />;
}