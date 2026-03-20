import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { getLegalPageBySlug } from '@/lib/content-source';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageBySlug('politica-de-privacidade');

  return buildMetadata({
    title: content.title,
    description: content.description,
    path: '/politica-de-privacidade',
  });
}

export default async function PoliticaDePrivacidadePage() {
  const content = await getLegalPageBySlug('politica-de-privacidade');
  return <LegalPage content={content} />;
}