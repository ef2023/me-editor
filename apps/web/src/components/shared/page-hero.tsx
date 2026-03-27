import Link from 'next/link';
import styles from './page-hero.module.scss';

type HeroAction = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeroAction[];
};

export function PageHero({eyebrow, title, description, actions = []}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.surface}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>

          {actions.length > 0 ? (
            <div className={styles.actions}>
              {actions.map((action) => (
                <Link key={action.href} href={action.href} className={styles.action}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}