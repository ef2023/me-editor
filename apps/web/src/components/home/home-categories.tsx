import Link from 'next/link';
import { getCategories } from '@/lib/content-source';
import styles from './home-categories.module.scss';

export async function HomeCategories() {
  const categories = await getCategories();

  return (
    <section className="section" id="categorias">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Navegue por assunto</p>
          <h2 className="section-title">A taxonomia nasce curta, clara e pronta para crescer com ordem.</h2>
          <p className="section-copy">
            Em vez de abrir dezenas de áreas frágeis, o portal começa com poucas frentes bem
            definidas, capazes de sustentar clusters reais de conteúdo.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <article key={category.slug} className={styles.card}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>

              <div className={styles.copy}>
                <h3>
                  <Link href={`/${category.slug}`} className={styles.link}>
                    {category.title}
                  </Link>
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