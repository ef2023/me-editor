import Link from 'next/link';
import type {CmsArticlePost} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './continue-reading.module.scss';

type ContinueReadingProps = {
  posts: CmsArticlePost[];
};

export function ContinueReading({posts}: ContinueReadingProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className="eyebrow">Continue estudando</p>
        <h2>Outros conteúdos para continuar a leitura.</h2>
      </div>

      <div className={styles.list}>
        {posts.map((post) => (
          <article key={`${post.categorySlug}-${post.slug}`} className={styles.item}>
            <span className={styles.category}>{post.eyebrow}</span>

            <h3 className={styles.title}>
              <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.link}>
                {post.title}
              </Link>
            </h3>

            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.meta}>
              <span>{post.readingTime}</span>
              <span>Atualizado em {formatDate(post.updatedAt)}</span>
              {post.author ? <span>Por {post.author.name}</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}