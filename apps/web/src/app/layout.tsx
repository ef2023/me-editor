import type {Metadata} from 'next';
import {draftMode} from 'next/headers';
import {GoogleTagManager} from '@next/third-parties/google';
import {VisualEditing} from 'next-sanity/visual-editing';
import {DisableDraftMode} from '@/components/preview/disable-draft-mode';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Mistério do Evangelho',
    template: '%s | Mistério do Evangelho',
  },
  description:
    'Portal cristão de explicação bíblica, formação cristã prática e interpretação responsável.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="pt-BR">
      <GoogleTagManager gtmId="GTM-5DDJQ7TG" />
      <body className="site-body">
        {children}
        {isDraftMode ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
      </body>
    </html>
  );
}