import {ImageResponse} from 'next/og';
import {getSiteSettings} from '@/lib/content-source';

export const alt = 'Mistério do Evangelho';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#fafafa',
          color: '#1d1d1d',
          padding: '64px',
          justifyContent: 'space-between',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#686868',
          }}
        >
          Mistério do Evangelho
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              lineHeight: 1.08,
              fontWeight: 700,
            }}
          >
            {settings.siteTitle}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.35,
              color: '#484848',
            }}
          >
            {settings.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}