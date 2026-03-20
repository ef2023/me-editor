import Link from 'next/link';
import {getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-reading-paths.module.scss';

type ReadingPathsSection = Extract<HomeSection, {_type: 'readingPathsSection'}>;

function isReadingPathsSection(section: HomeSection): section is ReadingPathsSection {
  return section._type === 'readingPathsSection';
}

export async function HomeReadingPaths() {
  const home = await getHomePage();
  const section = home.sections.find(isReadingPathsSection);

  if (!section) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">{section.eyebrow ?? 'Percursos de leitura'}</p>
          <h2 className={styles.title}>{section.title}</h2>
          <p className={styles.copy}>{section.description}</p>
        </div>

        <div className={styles.grid}>
          {section.paths.map((path, index) => (
            <article key={`${section._key}-${index}`} className={styles.item}>
              <span className={styles.step}>{path.step}</span>

              <div className={styles.content}>
                <h3 className={styles.itemTitle}>
                  {path.post ? (
                    <Link
                      href={`/${path.post.categorySlug}/${path.post.slug}`}
                      className={styles.link}
                    >
                      {path.title}
                    </Link>
                  ) : (
                    path.title
                  )}
                </h3>

                <p>{path.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}