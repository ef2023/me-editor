import Link from 'next/link';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import {PageHero} from '@/components/shared/page-hero';
import type {CmsEsboco} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './esboco-list-shell.module.scss';

type EsbocoListShellProps = {
  esbocos: CmsEsboco[];
};

export function EsbocoListShell({esbocos}: EsbocoListShellProps) {
  return (
    <>
      <section className="section-tight">
        <div className="container">
          <Breadcrumbs
            items={[
              {label: 'Home', href: '/'},
              {label: 'Esboços'},
            ]}
          />
        </div>
      </section>

      <PageHero
        eyebrow="Esboços bíblicos"
        title="Esboços bíblicos para pregação e estudo"
        description="Uma biblioteca editorial de esboços bíblicos organizada para apoiar ensino, pregação e estudo das Escrituras com clareza, estrutura e fidelidade."
        titleNoWrap
        actions={[
          {label: 'Voltar para Home', href: '/'},
          {label: 'Buscar conteúdos', href: '/busca'},
        ]}
      />

      <section className="section-tight">
        <div className="container">
          {esbocos.length > 0 ? (
            <div className={styles.grid}>
              {esbocos.map((esboco) => (
                <article key={esboco.slug} className={styles.card}>
                  <span className={styles.eyebrow}>{esboco.eyebrow}</span>

                  <h2 className={styles.title}>
                    <Link href={`/esbocos/${esboco.slug}`} className={styles.titleLink}>
                      {esboco.title}
                    </Link>
                  </h2>

                  {esboco.bibleText ? (
                    <p className={styles.bibleText}>Texto base: {esboco.bibleText}</p>
                  ) : null}

                  <p className={styles.excerpt}>{esboco.excerpt}</p>

                  <div className={styles.meta}>
                    <span>{esboco.readingTime}</span>
                    <span>Atualizado em {formatDate(esboco.updatedAt)}</span>
                    {esboco.author ? <span>Por {esboco.author.name}</span> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2>Área de esboços em preparação</h2>
              <p>Os primeiros esboços bíblicos ainda estão sendo organizados no portal.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}