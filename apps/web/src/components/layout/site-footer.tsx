import Link from 'next/link';
import { getSiteSettings } from '@/lib/content-source';
import styles from './site-footer.module.scss';

const institutionalLinks = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
  { label: 'Privacidade', href: '/politica-de-privacidade' },
  { label: 'Cookies', href: '/politica-de-cookies' },
  { label: 'Termos', href: '/termos-de-uso' },
  { label: 'Aviso editorial', href: '/aviso-editorial' },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>MISTÉRIO DO EVANGELHO</p>
          <p className={styles.description}>{settings.footerDescription}</p>
        </div>

        <nav aria-label="Links institucionais" className={styles.nav}>
          {institutionalLinks.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}