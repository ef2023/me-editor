import Link from 'next/link';
import {PortableText} from '@portabletext/react';
import type {PortableTextBlock} from '@portabletext/types';
import {ContinueReading} from '@/components/article/continue-reading';
import {SanityImage} from '@/components/media/sanity-image';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import type {CmsArticlePost} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import type {SiteCategory} from '@/lib/content';
import styles from './article-shell.module.scss';

type ArticleShellProps = {
  category: SiteCategory;
  post: CmsArticlePost;
  relatedPosts: CmsArticlePost[];
};

export function ArticleShell({category, post, relatedPosts}: ArticleShellProps) {
  const portableBody: PortableTextBlock[] = Array.isArray(post.body)
    ? (post.body as PortableTextBlock[])
    : [];

  const hasPortableBody = portableBody.length > 0;

  return (
    <section className="section-tight">
      <div className="container">
        <Breadcrumbs
          items={[
            {label: 'Home', href: '/'},
            {label: category.title, href: `/${category.slug}`},
            {label: post.title},
          ]}
        />

        <article className={styles.article}>
          <header className={styles.header}>
            <p className="eyebrow">{post.eyebrow}</p>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.meta}>
              <span>{post.readingTime}</span>
              <span>Publicado em {formatDate(post.publishedAt)}</span>
              <span>Atualizado em {formatDate(post.updatedAt)}</span>
            </div>

            {post.author ? (
              <p className={styles.authorLine}>
                Por{' '}
                <Link href={`/autor/${post.author.slug}`} className={styles.authorLink}>
                  {post.author.name}
                </Link>
                {post.author.role ? ` · ${post.author.role}` : ''}
              </p>
            ) : null}

            {post.coverImage ? (
              <div className={styles.coverWrap}>
                <SanityImage
                  image={post.coverImage}
                  alt={post.coverImage.alt ?? post.title}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 760px, 100vw"
                  className={styles.coverImage}
                  priority
                />
              </div>
            ) : null}
          </header>

          <div className={styles.layout}>
            <div className={styles.body}>
              {hasPortableBody ? (
                <div className={styles.richText}>
                  <PortableText value={portableBody} />
                </div>
              ) : (
                post.sections.map((section) => (
                  <section key={section.title} className={styles.section}>
                    <h2>{section.title}</h2>

                    <div className={styles.copy}>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))
              )}

              <ContinueReading posts={relatedPosts} />
            </div>

            <aside className={styles.aside}>
              <div className={styles.sideCard}>
                <h2>Cluster principal</h2>
                <p>{post.pillar}</p>
              </div>

              {post.author ? (
                <div className={styles.sideCard}>
                  <h2>Autoria</h2>
                  <p>{post.author.name}</p>
                  {post.author.role ? <p>{post.author.role}</p> : null}
                  <Link href={`/autor/${post.author.slug}`} className={styles.sideLink}>
                    Ver perfil do autor
                  </Link>
                </div>
              ) : null}

              <div className={styles.sideCard}>
                <h2>Tags do conteúdo</h2>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sideCard}>
                <h2>Próximo passo</h2>
                <p>
                  Continue navegando pelo cluster para construir entendimento temático, e não apenas
                  leitura isolada.
                </p>
                <Link href={`/${category.slug}`} className={styles.sideLink}>
                  Ver todos os conteúdos da categoria
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}