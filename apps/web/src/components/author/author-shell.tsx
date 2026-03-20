import Link from 'next/link';
import {PortableText} from '@portabletext/react';
import type {PortableTextBlock} from '@portabletext/types';
import {SanityImage} from '@/components/media/sanity-image';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import type {CmsAuthor, CmsArticlePost} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './author-shell.module.scss';

type AuthorShellProps = {
  author: CmsAuthor;
  posts: CmsArticlePost[];
};

export function AuthorShell({author, posts}: AuthorShellProps) {
  const bioBlocks = Array.isArray(author.bio)
    ? (author.bio as PortableTextBlock[])
    : [];

  return (
    <section className="section-tight">
      <div className="container-content">
        <Breadcrumbs
          items={[
            {label: 'Home', href: '/'},
            {label: 'Autor'},
            {label: author.name},
          ]}
        />

        <div className={styles.hero}>
          {author.image ? (
            <div className={styles.imageWrap}>
              <SanityImage
                image={author.image}
                alt={author.image.alt ?? author.name}
                width={480}
                height={480}
                sizes="(min-width: 1024px) 220px, 120px"
                className={styles.image}
                priority
              />
            </div>
          ) : null}

          <div className={styles.copy}>
            <p className="eyebrow">Autoria</p>
            <h1 className={styles.title}>{author.name}</h1>
            {author.role ? <p className={styles.role}>{author.role}</p> : null}
            {author.shortBio ? <p className={styles.bio}>{author.shortBio}</p> : null}

            {bioBlocks.length > 0 ? (
              <div className={styles.bio}>
                <PortableText value={bioBlocks} />
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.posts}>
          <div className={styles.sectionHead}>
            <h2>Conteúdos publicados</h2>
            <p>{posts.length} conteúdo(s) vinculado(s) a este perfil.</p>
          </div>

          <div className={styles.list}>
            {posts.map((post) => (
              <article key={post.slug} className={styles.item}>
                <span className={styles.category}>{post.eyebrow}</span>

                <h3 className={styles.itemTitle}>
                  <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.link}>
                    {post.title}
                  </Link>
                </h3>

                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.meta}>
                  <span>{post.readingTime}</span>
                  <span>Atualizado em {formatDate(post.updatedAt)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}