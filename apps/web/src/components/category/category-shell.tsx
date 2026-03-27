import Link from 'next/link';
import {PortableText} from '@portabletext/react';
import {SanityImage} from '@/components/media/sanity-image';
import {Breadcrumbs} from '@/components/navigation/breadcrumbs';
import {PageHero} from '@/components/shared/page-hero';
import type {CategoryListingResult, ModularSection} from '@/lib/content-source';
import {formatDate} from '@/lib/content-source';
import styles from './category-shell.module.scss';

type CategoryShellProps = {
  listing: CategoryListingResult;
};

type RichTextSection = Extract<ModularSection, {_type: 'richTextSection'}>;
type CuratedPostsSection = Extract<ModularSection, {_type: 'curatedPostsSection'}>;
type CtaBannerSection = Extract<ModularSection, {_type: 'ctaBanner'}>;
type FaqSection = Extract<ModularSection, {_type: 'faqSection'}>;

function isRichTextSection(section: ModularSection): section is RichTextSection {
  return section._type === 'richTextSection';
}

function isCuratedPostsSection(section: ModularSection): section is CuratedPostsSection {
  return section._type === 'curatedPostsSection';
}

function isCtaBannerSection(section: ModularSection): section is CtaBannerSection {
  return section._type === 'ctaBanner';
}

function isFaqSection(section: ModularSection): section is FaqSection {
  return section._type === 'faqSection';
}

function renderSection(section: ModularSection) {
  if (isRichTextSection(section)) {
    return (
      <article key={section._key} className={styles.card}>
        {section.title ? <h2>{section.title}</h2> : null}
        <div className={styles.richText}>
          <PortableText value={section.body ?? []} />
        </div>
      </article>
    );
  }

  if (isCuratedPostsSection(section)) {
    return (
      <section key={section._key} className="section-tight">
        <div className={styles.grid}>
          {section.posts.map((post) => (
            <article key={post.slug} className={styles.card}>
              {post.coverImage ? (
                <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.imageLink}>
                  <SanityImage
                    image={post.coverImage}
                    alt={post.coverImage.alt ?? post.title}
                    width={1200}
                    height={720}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className={styles.image}
                  />
                </Link>
              ) : null}

              <span className={styles.eyebrow}>{post.eyebrow}</span>
              <h2 className={styles.title}>
                <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.titleLink}>
                  {post.title}
                </Link>
              </h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (isFaqSection(section)) {
    return (
      <article key={section._key} className={styles.card}>
        {section.title ? <h2>{section.title}</h2> : null}
        <div className={styles.stack}>
          {(section.items ?? []).map((item, index) => (
            <div key={`${section._key}-${index}`} className={styles.card}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (isCtaBannerSection(section)) {
    return (
      <article key={section._key} className={styles.card}>
        {section.title ? <h2>{section.title}</h2> : null}
        {section.description ? <p>{section.description}</p> : null}
        {section.buttonLabel && section.buttonHref ? (
          <Link href={section.buttonHref}>{section.buttonLabel}</Link>
        ) : null}
      </article>
    );
  }

  return null;
}

export function CategoryShell({listing}: CategoryShellProps) {
  const category = listing.category;

  if (!category) {
    return null;
  }

  const prevHref =
    listing.page > 1 ? `/${category.slug}?page=${listing.page - 1}` : null;
  const nextHref =
    listing.page < listing.totalPages ? `/${category.slug}?page=${listing.page + 1}` : null;

  return (
    <>
      <section className="section-tight">
        <div className="container">
          <Breadcrumbs
            items={[
              {label: 'Home', href: '/'},
              {label: category.title},
            ]}
          />
        </div>
      </section>

      <PageHero
        eyebrow={category.eyebrow}
        title={category.heroTitle ?? category.title}
        description={category.heroDescription ?? category.description}
        actions={[
          {label: 'Ver página Sobre', href: '/sobre'},
          {label: 'Buscar conteúdos', href: '/busca'},
        ]}
      />

      {category.sections && category.sections.length > 0 ? (
        <section className="section-tight">
          <div className="container">{category.sections.map(renderSection)}</div>
        </section>
      ) : null}

      <section className="section-tight">
        <div className="container">
          {listing.posts.length > 0 ? (
            <>
              <div className={styles.grid}>
                {listing.posts.map((post) => (
                  <article key={post.slug} className={styles.card}>
                    {post.coverImage ? (
                      <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.imageLink}>
                        <SanityImage
                          image={post.coverImage}
                          alt={post.coverImage.alt ?? post.title}
                          width={1200}
                          height={720}
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          className={styles.image}
                        />
                      </Link>
                    ) : null}

                    <span className={styles.eyebrow}>{post.eyebrow}</span>
                    <h2 className={styles.title}>
                      <Link href={`/${post.categorySlug}/${post.slug}`} className={styles.titleLink}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.meta}>
                      <span>{post.readingTime}</span>
                      <span>Atualizado em {formatDate(post.updatedAt)}</span>
                      {post.author ? <span>Por {post.author.name}</span> : null}
                    </div>
                  </article>
                ))}
              </div>

              {listing.totalPages > 1 ? (
                <nav
                  aria-label="Paginação da categoria"
                  style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}
                >
                  {prevHref ? <Link href={prevHref}>Página anterior</Link> : <span />}
                  {nextHref ? <Link href={nextHref}>Próxima página</Link> : null}
                </nav>
              ) : null}
            </>
          ) : (
            <div className={styles.emptyState}>
              <h2>Categoria preparada para crescimento</h2>
              <p>Esta área ainda não recebeu artigos publicados nesta fase.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}