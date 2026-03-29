import Link from 'next/link';
import {PortableText} from '@portabletext/react';
import type {PortableTextBlock} from '@portabletext/types';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import type {CmsEsboco} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './esboco-shell.module.scss';

type EsbocoShellProps = {
  esboco: CmsEsboco;
};

export function EsbocoShell({esboco}: EsbocoShellProps) {
  const portableBody: PortableTextBlock[] = Array.isArray(esboco.body)
    ? (esboco.body as PortableTextBlock[])
    : [];

  return (
    <section className="section-tight">
      <div className="container-content">
        <Breadcrumbs
          items={[
            {label: 'Home', href: '/'},
            {label: 'Esboços', href: '/esbocos'},
            {label: esboco.title},
          ]}
        />

        <article className={styles.esboco}>
          <header className={styles.header}>
            <p className="eyebrow">{esboco.eyebrow}</p>
            <h1 className={styles.title}>{esboco.title}</h1>
            <p className={styles.excerpt}>{esboco.excerpt}</p>

            <div className={styles.meta}>
              <span>{esboco.readingTime}</span>
              <span>Publicado em {formatDate(esboco.publishedAt)}</span>
              <span>Atualizado em {formatDate(esboco.updatedAt)}</span>
            </div>

            {esboco.author ? (
              <p className={styles.authorLine}>
                Por{' '}
                <Link href={`/autor/${esboco.author.slug}`} className={styles.authorLink}>
                  {esboco.author.name}
                </Link>
                {esboco.author.role ? ` · ${esboco.author.role}` : ''}
              </p>
            ) : null}
          </header>

          <div className={styles.layout}>
            <div className={styles.body}>
              <div className={styles.richText}>
                <PortableText value={portableBody} />
              </div>
            </div>

            <aside className={styles.aside}>
              <div className={styles.sideCard}>
                <h2>Cluster principal</h2>
                <p>{esboco.pillar}</p>
              </div>

              {esboco.bibleText ? (
                <div className={styles.sideCard}>
                  <h2>Texto base</h2>
                  <p>{esboco.bibleText}</p>
                </div>
              ) : null}

              {esboco.author ? (
                <div className={styles.sideCard}>
                  <h2>Autoria</h2>
                  <p>{esboco.author.name}</p>
                  {esboco.author.role ? <p>{esboco.author.role}</p> : null}
                </div>
              ) : null}

              {esboco.tags.length > 0 ? (
                <div className={styles.sideCard}>
                  <h2>Tags do conteúdo</h2>
                  <div className={styles.tags}>
                    {esboco.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}