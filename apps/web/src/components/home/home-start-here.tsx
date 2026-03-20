import Link from 'next/link';
import {formatDate, getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-start-here.module.scss';

type CuratedSection = Extract<HomeSection, {_type: 'curatedPostsSection'}>;

function isCuratedSection(section: HomeSection): section is CuratedSection {
  return section._type === 'curatedPostsSection';
}

export async function HomeStartHere() {
  const home = await getHomePage();
  const curatedSections = home.sections.filter(isCuratedSection);
  const section = curatedSections[0];
  const [lead, ...secondary] = section?.posts ?? [];

  if (!section || !lead) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.intro}>
            <p className="eyebrow">{section.eyebrow ?? 'Comece por aqui'}</p>
            <h2 className={styles.title}>{section.title}</h2>
            <p className={styles.copy}>{section.description}</p>
          </div>

          <div className={styles.content}>
            <article className={styles.lead}>
              <span className={styles.category}>{lead.eyebrow}</span>

              <h3 className={styles.leadTitle}>
                <Link href={`/${lead.categorySlug}/${lead.slug}`} className={styles.leadLink}>
                  {lead.title}
                </Link>
              </h3>

              <p className={styles.leadExcerpt}>{lead.excerpt}</p>

              <div className={styles.meta}>
                <span>{lead.readingTime}</span>
                <span>Atualizado em {formatDate(lead.updatedAt)}</span>
              </div>
            </article>

            <div className={styles.secondaryList}>
              {secondary.map((post) => (
                <article key={post.slug} className={styles.secondaryItem}>
                  <span className={styles.category}>{post.eyebrow}</span>

                  <h3 className={styles.secondaryTitle}>
                    <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.secondaryLink}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className={styles.secondaryExcerpt}>{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}