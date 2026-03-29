import type {Metadata} from 'next';
import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';
import {EsbocoListShell} from '@/components/esboco/esboco-list-shell';
import {getAllEsbocos} from '@/lib/content-source';

export const metadata: Metadata = {
  title: 'Esboços bíblicos | Mistério do Evangelho',
  description:
    'Acesse esboços bíblicos organizados para pregação, ensino e estudo das Escrituras.',
};

export default async function EsbocosPage() {
  const esbocos = await getAllEsbocos();

  return (
    <>
      <SiteHeader />
      <main>
        <EsbocoListShell esbocos={esbocos} />
      </main>
      <SiteFooter />
    </>
  );
}