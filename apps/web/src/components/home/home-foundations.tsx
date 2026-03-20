import {getHomePage, type HomeSection} from '@/lib/content-source';
import styles from './home-foundations.module.scss';

type PrinciplesSection = Extract<HomeSection, {_type: 'principlesSection'}>;

function isPrinciplesSection(section: HomeSection): section is PrinciplesSection {
  return section._type === 'principlesSection';
}

export async function HomeFoundations() {
  const home = await getHomePage();
  const section = home.sections.find(isPrinciplesSection);

  if (!section) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{section.eyebrow ?? 'Compromissos editoriais'}</p>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-copy">{section.description}</p>
        </div>

        <div className={styles.grid}>
          {section.items.map((item, index) => (
            <article key={`${section._key}-${index}`} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}