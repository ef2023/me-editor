import { ImageResponse } from 'next/og';
import { getAuthorBySlug } from '@/lib/content-source';

export const alt = 'Preview do autor';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

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
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#686868',
          }}
        >
          Autoria
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            maxWidth: 950,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 700,
            }}
          >
            {author?.name ?? 'Autor'}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.35,
              color: '#484848',
            }}
          >
            {author?.shortBio ?? 'Perfil editorial do portal.'}          </div>
        </div>
      </div>
    ),
    size,
  );
}