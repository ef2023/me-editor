import Link from 'next/link';
import {SanityImage} from '@/components/media/sanity-image';
import {getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-hero.module.scss';

type HeroSection = Extract<HomeSection, {_type: 'heroSection'}>;

function isHeroSection(section: HomeSection): section is HeroSection {
  return section._type === 'heroSection';
}

export async function HomeHero() {
  const home = await getHomePage();
  const hero = home.sections.find(isHeroSection);
  const featured = hero?.featuredPost;

  if (!hero) {
    return null;
  }

  return (
    <section className={styles.hero} id="topo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{hero.eyebrow ?? 'Portal cristão editoril'}</p>

          <h1 className={styles.title}>{hero.title}</h1>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.actions}>
            {hero.primaryLabel && hero.primaryHref ? (
              <Link href={hero.primaryHref} className={styles.primaryAction}>
                {hero.primaryLabel}
              </Link>
            ) : null}

            {hero.secondaryLabel && hero.secondaryHref ? (
              <Link href={hero.secondaryHref} className={styles.secondaryAction}>
                {hero.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <aside className={styles.editorial}>
          {featured?.coverImage ? (
            <Link
              href={`/${featured.categorySlug}/${featured.slug}`}
              className={styles.previewImageLink}
            >
              <SanityImage
                image={featured.coverImage}
                alt={featured.coverImage.alt ?? featured.title}
                width={900}
                height={560}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className={styles.previewImage}
                priority
              />
            </Link>
          ) : null}

          {featured ? (
            <div className={styles.previewCard}>
              <p className={styles.editorialLabel}>Em destaque</p>
              <span className={styles.previewCategory}>{featured.eyebrow}</span>

              <h2 className={styles.previewTitle}>
                <Link href={`/${featured.categorySlug}/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className={styles.previewExcerpt}>{featured.excerpt}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}