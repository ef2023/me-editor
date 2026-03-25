import type {Metadata} from 'next';
import Script from 'next/script';
import {draftMode} from 'next/headers';
import {GoogleTagManager} from '@next/third-parties/google';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {VisualEditing} from 'next-sanity/visual-editing';
import {DisableDraftMode} from '@/components/preview/disable-draft-mode';
import {CookieConsentBanner} from '@/components/consent/cookie-consent-banner';
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
      <Script id="google-consent-defaults" strategy="beforeInteractive">
        {`
          (function () {
            var COOKIE_NAME = 'me_cookie_consent';

            function readCookie(name) {
              var escaped = name.replace(/[-[\\]\\/{}()*+?.\\\\^$|]/g, '\\\\$&');
              var match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
              return match ? decodeURIComponent(match[1]) : '';
            }

            var stored = readCookie(COOKIE_NAME);
            var analyticsStorage = stored === 'accepted' ? 'granted' : 'denied';

            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            window.gtag = window.gtag || gtag;

            window.gtag('consent', 'default', {
              analytics_storage: analyticsStorage,
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'granted',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
          })();
        `}
      </Script>

      <GoogleTagManager gtmId="GTM-5DDJQ7TG" />

      <body className="site-body">
        {children}
        <CookieConsentBanner />
        <SpeedInsights />
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
