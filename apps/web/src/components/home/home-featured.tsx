import Link from 'next/link';
import {SanityImage} from '@/components/media/sanity-image';
import {formatDate, getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-featured.module.scss';

type CuratedSection = Extract<HomeSection, {_type: 'curatedPostsSection'}>;

function isCuratedSection(section: HomeSection): section is CuratedSection {
  return section._type === 'curatedPostsSection';
}

export async function HomeFeatured() {
  const home = await getHomePage();
  const curatedSections = home.sections.filter(isCuratedSection);
  const section = curatedSections[1] ?? curatedSections[0];
  const featured = section?.posts?.[0];

  if (!section || !featured) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.left}>
            <p className="eyebrow">{section.eyebrow ?? 'Leitura em destaque'}</p>
            <h2 className={styles.title}>{section.title}</h2>
            <p className={styles.copy}>{section.description}</p>
          </div>

          <div className={styles.right}>
            <article className={styles.featuredArticle}>
              {featured.coverImage ? (
                <Link
                  href={`/${featured.categorySlug}/${featured.slug}`}
                  className={styles.imageLink}
                >
                  <SanityImage
                    image={featured.coverImage}
                    alt={featured.coverImage.alt ?? featured.title}
                    width={1200}
                    height={720}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className={styles.image}
                  />
                </Link>
              ) : null}

              <span className={styles.category}>{featured.eyebrow}</span>

              <h3 className={styles.articleTitle}>
                <Link
                  href={`/${featured.categorySlug}/${featured.slug}`}
                  className={styles.articleLink}
                >
                  {featured.title}
                </Link>
              </h3>

              <p className={styles.excerpt}>{featured.excerpt}</p>

              <div className={styles.meta}>
                <span>{featured.readingTime}</span>
                <span>Atualizado em {formatDate(featured.updatedAt)}</span>
                {featured.author ? <span>Por {featured.author.name}</span> : null}
              </div>

              <Link
                href={`/${featured.categorySlug}/${featured.slug}`}
                className={styles.readMore}
              >
                Ler este conteúdo
              </Link>
            </article>

            <aside className={styles.notes}>
              <div className={styles.note}>
                <strong>Função editorial</strong>
                <p>
                  Destacar uma peça forte ajuda a comunicar tese, tom e profundidade logo na
                  primeira visita.
                </p>
              </div>

              <div className={styles.note}>
                <strong>Função estratégica</strong>
                <p>
                  A home passa a funcionar como capa curada, não apenas como listagem de links.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}