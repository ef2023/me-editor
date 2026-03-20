import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import styles from './not-found.module.scss';

export const metadata = buildMetadata({
  title: 'Página não encontrada',
  description: 'A página solicitada não existe ou não está disponível.',
  path: '/not-found',
  noIndex: true,
});

export default function NotFoundPage() {
  return (
     <section className="section">
      <div className="container-content">
        <div className={styles.stack}>
          <p className="eyebrow">Erro 404</p>
          <h1>Página não encontrada</h1>
          <p>
            O endereço solicitado não existe, foi movido ou ainda não está disponível nesta etapa
            do projeto.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.link}>
              Voltar para a home
            </Link>
            <Link href="/sobre" className={styles.link}>
              Ver página Sobre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}