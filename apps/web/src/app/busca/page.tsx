import Link from 'next/link';
import type {Metadata} from 'next';
import {getSearchPage} from '@/lib/content-source';
import {buildMetadata} from '@/lib/seo';

type PageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export async function generateMetadata({searchParams}: PageProps): Promise<Metadata> {
  const {q} = await searchParams;

  return buildMetadata({
    title: q ? `Busca: ${q}` : 'Busca',
    description: 'Busque conteúdos dentro do portal.',
    path: q ? `/busca?q=${encodeURIComponent(q)}` : '/busca',
    noIndex: true,
  });
}

export default async function BuscaPage({searchParams}: PageProps) {
  const {q = '', page = '1'} = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const results = await getSearchPage(q, currentPage, 10);

  const prevHref =
    currentPage > 1 ? `/busca?q=${encodeURIComponent(q)}&page=${currentPage - 1}` : null;
  const nextHref =
    currentPage < results.totalPages
      ? `/busca?q=${encodeURIComponent(q)}&page=${currentPage + 1}`
      : null;

  return (
    <section className="section-tight">
      <div className="container-content">
        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          <p className="eyebrow">Busca interna</p>
          <h1>Encontre conteúdos do portal</h1>

          <form action="/busca" method="get">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Buscar por evangelho, oração, salvação..."
              style={{
                width: '100%',
                minHeight: '3rem',
                padding: '0 1rem',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface-0)',
              }}
            />
          </form>

          {q ? (
            <p>
              {results.total} resultado(s) para “{q}”. Página {results.page} de {Math.max(1, results.totalPages)}.
            </p>
          ) : null}

          <div
            style={{
              display: 'grid',
              gap: '1rem',
            }}
          >
            {results.items.map((post) => (
              <article
                key={post.slug}
                style={{
                  display: 'grid',
                  gap: '0.45rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border-soft)',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-ink-600)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {post.eyebrow}
                </span>

                <h2 style={{fontSize: '1.08rem'}}>
                  <Link href={`/${post.categorySlug}/${post.slug}`}>{post.title}</Link>
                </h2>

                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>

          {results.totalPages > 1 ? (
            <nav
              aria-label="Paginação da busca"
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '0.5rem',
              }}
            >
              {prevHref ? <Link href={prevHref}>Página anterior</Link> : <span />}
              {nextHref ? <Link href={nextHref}>Próxima página</Link> : null}
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}