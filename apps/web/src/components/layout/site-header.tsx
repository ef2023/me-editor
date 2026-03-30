import Link from 'next/link';
import styles from './site-header.module.scss';

const navItems = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Esboços', href: '/esbocos' },
  { label: 'Contato', href: '/contato' },
  {
    label: 'Ver todos os posts',
    href: '/posts',
  },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ir para a página inicial">
          MISTÉRIO DO EVANGELHO
        </Link>

        <nav aria-label="Navegação principal" className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}