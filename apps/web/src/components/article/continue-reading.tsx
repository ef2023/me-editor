import Link from 'next/link';
import type { ArticlePost } from '@/lib/content';
import styles from './continue-reading.module.scss';

type ContinueReadingProps = {
  posts: ArticlePost[];
};

export function ContinueReading({ posts }: ContinueReadingProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className="eyebrow">Continue estudando</p>
        <h2>Leituras relacionadas para aprofundar o tema.</h2>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <span className={styles.category}>{post.eyebrow}</span>
            <h3 className={styles.title}>
              <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.link}>
                {post.title}
              </Link>
            </h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}