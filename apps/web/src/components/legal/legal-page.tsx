import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { PageHero } from '@/components/shared/page-hero';
import type { CmsLegalPage, ModularSection } from '@/lib/content-source';
import styles from './legal-page.module.scss';

type LegalPageProps = {
  content: CmsLegalPage;
};

type RichTextSection = Extract<ModularSection, { _type: 'richTextSection' }>;
type FaqSection = Extract<ModularSection, { _type: 'faqSection' }>;
type CtaBannerSection = Extract<ModularSection, { _type: 'ctaBanner' }>;
type CuratedPostsSection = Extract<ModularSection, { _type: 'curatedPostsSection' }>;

function isRichTextSection(section: ModularSection): section is RichTextSection {
  return section._type === 'richTextSection';
}

function isFaqSection(section: ModularSection): section is FaqSection {
  return section._type === 'faqSection';
}

function isCtaBannerSection(section: ModularSection): section is CtaBannerSection {
  return section._type === 'ctaBanner';
}

function isCuratedPostsSection(section: ModularSection): section is CuratedPostsSection {
  return section._type === 'curatedPostsSection';
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

  if (isCuratedPostsSection(section)) {
    return (
      <article key={section._key} className={styles.card}>
        {section.title ? <h2>{section.title}</h2> : null}
        {section.description ? <p>{section.description}</p> : null}
      </article>
    );
  }

  return null;
}

export function LegalPage({ content }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        actions={[
          { label: 'Voltar para a home', href: '/' },
          { label: 'Ver aviso editorial', href: '/aviso-editorial' },
        ]}
      />

      <section className="section-tight">
        <div className="container-content">
          {content.sections && content.sections.length > 0 ? (
            <div className={styles.stack}>{content.sections.map(renderSection)}</div>
          ) : (
            <div className={styles.stack} />
          )}
        </div>
      </section>
    </>
  );
}