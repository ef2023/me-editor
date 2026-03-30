import Link from 'next/link';
import {SanityImage} from '@/components/media/sanity-image';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import {PageHero} from '@/components/shared/page-hero';
import type {CmsArticlePost} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './post-list-shell.module.scss';

type PostListShellProps = {
  posts: CmsArticlePost[];
};

export function PostListShell({posts}: PostListShellProps) {
  return (
    <>
      <section className="section-tight">
        <div className="container">
          <Breadcrumbs
            items={[
              {label: 'Home', href: '/'},
              {label: 'Posts'},
            ]}
          />
        </div>
      </section>

      <PageHero
        eyebrow="Posts"
        title="Todos os posts do portal"
        description="Uma listagem completa dos conteúdos publicados no portal, organizada para facilitar navegação, leitura e descoberta editorial."
        actions={[
          {label: 'Voltar para Home', href: '/'},
          {label: 'Buscar conteúdos', href: '/busca'},
        ]}
      />

      <section className="section-tight">
        <div className="container">
          {posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post) => (
                <article key={`${post.categorySlug}-${post.slug}`} className={styles.card}>
                  {post.coverImage ? (
                    <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.imageLink}>
                      <SanityImage
                        image={post.coverImage}
                        alt={post.coverImage.alt ?? post.title}
                        width={1200}
                        height={720}
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className={styles.image}
                      />
                    </Link>
                  ) : null}

                  <span className={styles.eyebrow}>{post.eyebrow}</span>

                  <h2 className={styles.title}>
                    <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.titleLink}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className={styles.excerpt}>{post.excerpt}</p>

                  <div className={styles.meta}>
                    <span>{post.readingTime}</span>
                    <span>Atualizado em {formatDate(post.updatedAt)}</span>
                    {post.author ? <span>Por {post.author.name}</span> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2>Área de posts em preparação</h2>
              <p>Os conteúdos do portal ainda estão sendo organizados.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}