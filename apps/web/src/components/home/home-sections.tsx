import {SanityImage} from '@/components/media/sanity-image';
import {TrackedLink} from '@/components/analytics/tracked-link';
import {getCategories, getHomePage, type HomeSection} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './home-sections.module.scss';

function NewsletterForm({
  successMessage,
}: {
  successMessage?: string;
}) {
  return (
    <div className={styles.newsletterWrap}>
      <form action="/api/newsletter/subscribe" method="post" className={styles.newsletterForm}>
        <input type="hidden" name="redirectTo" value="/" />
        <input type="hidden" name="source" value="home" />
        <input
          type="email"
          name="email"
          placeholder="Seu melhor e-mail"
          required
          className={styles.newsletterInput}
        />
        <button type="submit" className={styles.newsletterButton}>
          Confirmar por e-mail
        </button>
      </form>

      {successMessage ? <p className={styles.newsletterHelp}>{successMessage}</p> : null}
    </div>
  );
}

async function renderSection(section: HomeSection) {
  switch (section._type) {
    case 'heroSection':
      return (
        <section key={section._key} className={styles.section}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h1 className={styles.heroTitle}>{section.title}</h1> : null}
              {section.description ? <p className={styles.heroDescription}>{section.description}</p> : null}

              <div className={styles.heroActions}>
                {section.primaryLabel && section.primaryHref ? (
                  <TrackedLink
                    href={section.primaryHref}
                    className={styles.primaryAction}
                    eventName="editorial_block_click"
                    section="hero"
                    label={section.primaryLabel}
                  >
                    {section.primaryLabel}
                  </TrackedLink>
                ) : null}

                {section.secondaryLabel && section.secondaryHref ? (
                  <TrackedLink
                    href={section.secondaryHref}
                    className={styles.secondaryAction}
                    eventName="editorial_block_click"
                    section="hero"
                    label={section.secondaryLabel}
                  >
                    {section.secondaryLabel}
                  </TrackedLink>
                ) : null}
              </div>
            </div>

            {section.featuredPost ? (
              <aside className={styles.heroAside}>
                {section.featuredPost.coverImage ? (
                  <TrackedLink
                    href={`/${section.featuredPost.categorySlug}/${section.featuredPost.slug}`}
                    className={styles.heroImageLink}
                    eventName="editorial_block_click"
                    section="hero_featured"
                    label={section.featuredPost.title}
                  >
                    <SanityImage
                      image={section.featuredPost.coverImage}
                      alt={section.featuredPost.coverImage.alt ?? section.featuredPost.title}
                      width={900}
                      height={560}
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className={styles.heroImage}
                      priority
                    />
                  </TrackedLink>
                ) : null}

                <div className={styles.heroFeaturedCard}>
                  <p className={styles.blockEyebrow}>Em destaque</p>
                  <h2 className={styles.blockTitle}>
                    <TrackedLink
                      href={`/${section.featuredPost.categorySlug}/${section.featuredPost.slug}`}
                      eventName="editorial_block_click"
                      section="hero_featured"
                      label={section.featuredPost.title}
                    >
                      {section.featuredPost.title}
                    </TrackedLink>
                  </h2>
                  <p className={styles.blockDescription}>{section.featuredPost.excerpt}</p>
                </div>
              </aside>
            ) : null}
          </div>
        </section>
      );

    case 'curatedPostsSection':
      return (
        <section key={section._key} className={styles.section}>
          <div className="container">
            <div className={styles.blockHead}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2 className={styles.blockHeadTitle}>{section.title}</h2> : null}
              {section.description ? <p className={styles.blockHeadDescription}>{section.description}</p> : null}
            </div>

            <div className={styles.postsGrid}>
              {section.posts.map((post) => (
                <article key={post.slug} className={styles.postCard}>
                  {post.coverImage ? (
                    <TrackedLink
                      href={`/${post.categorySlug}/${post.slug}`}
                      className={styles.postImageLink}
                      eventName="editorial_block_click"
                      section={section._key}
                      label={post.title}
                    >
                      <SanityImage
                        image={post.coverImage}
                        alt={post.coverImage.alt ?? post.title}
                        width={1200}
                        height={720}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className={styles.postImage}
                      />
                    </TrackedLink>
                  ) : null}

                  <span className={styles.postEyebrow}>{post.eyebrow}</span>
                  <h3 className={styles.postTitle}>
                    <TrackedLink
                      href={`/${post.categorySlug}/${post.slug}`}
                      eventName="editorial_block_click"
                      section={section._key}
                      label={post.title}
                    >
                      {post.title}
                    </TrackedLink>
                  </h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>{post.readingTime}</span>
                    <span>Atualizado em {formatDate(post.updatedAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 'readingPathsSection':
      return (
        <section key={section._key} className={styles.section}>
          <div className="container">
            <div className={styles.blockHead}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2 className={styles.blockHeadTitle}>{section.title}</h2> : null}
              {section.description ? <p className={styles.blockHeadDescription}>{section.description}</p> : null}
            </div>

            <div className={styles.listGrid}>
              {section.paths.map((path, index) => (
                <article key={`${section._key}-${index}`} className={styles.listItem}>
                  <span className={styles.listStep}>{path.step}</span>
                  <div className={styles.listCopy}>
                    <h3 className={styles.listTitle}>
                      {path.post ? (
                        <TrackedLink
                          href={`/${path.post.categorySlug}/${path.post.slug}`}
                          eventName="editorial_block_click"
                          section={section._key}
                          label={path.title}
                        >
                          {path.title}
                        </TrackedLink>
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

    case 'principlesSection':
      return (
        <section key={section._key} className={styles.section}>
          <div className="container">
            <div className={styles.blockHead}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2 className={styles.blockHeadTitle}>{section.title}</h2> : null}
              {section.description ? <p className={styles.blockHeadDescription}>{section.description}</p> : null}
            </div>

            <div className={styles.principlesGrid}>
              {section.items.map((item, index) => (
                <article key={`${section._key}-${index}`} className={styles.principleCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 'categoryGridSection': {
      const categories =
        section.categories && section.categories.length > 0
          ? section.categories
          : await getCategories();

      return (
        <section key={section._key} className={styles.section}>
          <div className="container">
            <div className={styles.blockHead}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2 className={styles.blockHeadTitle}>{section.title}</h2> : null}
              {section.description ? <p className={styles.blockHeadDescription}>{section.description}</p> : null}
            </div>

            <div className={styles.categoryGrid}>
              {categories.map((category, index) => (
                <article key={category.slug} className={styles.categoryCard}>
                  <span className={styles.categoryNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.categoryCopy}>
                    <h3>
                      <TrackedLink
                        href={`/${category.slug}`}
                        eventName="editorial_block_click"
                        section={section._key}
                        label={category.title}
                      >
                        {category.title}
                      </TrackedLink>
                    </h3>
                    <p>{category.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'ctaBanner':
    default:
      return (
        <section key={section._key} className={styles.section}>
          <div className="container">
            <div className={styles.ctaShell}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2 className={styles.ctaTitle}>{section.title}</h2> : null}
              {section.description ? <p className={styles.ctaDescription}>{section.description}</p> : null}

              {section.showNewsletterForm ? (
                <NewsletterForm successMessage={section.successMessage} />
              ) : null}

              {!section.showNewsletterForm && section.buttonLabel && section.buttonHref ? (
                <TrackedLink
                  href={section.buttonHref}
                  className={styles.primaryAction}
                  eventName="editorial_block_click"
                  section={section._key}
                  label={section.buttonLabel}
                >
                  {section.buttonLabel}
                </TrackedLink>
              ) : null}
            </div>
          </div>
        </section>
      );
  }
}

export async function HomeSections() {
  const home = await getHomePage();

  return <>{await Promise.all(home.sections.map((section) => renderSection(section)))}</>;
}