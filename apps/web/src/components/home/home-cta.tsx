import Link from 'next/link';
import {getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-cta.module.scss';

type CtaSection = Extract<HomeSection, {_type: 'ctaBanner'}>;

function isCtaSection(section: HomeSection): section is CtaSection {
  return section._type === 'ctaBanner';
}

export async function HomeCta() {
  const home = await getHomePage();
  const cta = home.sections.find(isCtaSection);

  if (!cta?.title) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className={styles.shell}>
          {cta.eyebrow ? <p className="eyebrow">{cta.eyebrow}</p> : null}
          <h2 className={styles.title}>{cta.title}</h2>
          {cta.description ? <p className={styles.description}>{cta.description}</p> : null}

          {cta.buttonLabel && cta.buttonHref ? (
            <Link href={cta.buttonHref} className={styles.button}>
              {cta.buttonLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}