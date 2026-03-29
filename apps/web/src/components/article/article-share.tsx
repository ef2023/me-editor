'use client';

import {useState} from 'react';
import styles from './article-share.module.scss';

type ArticleShareProps = {
  title: string;
  url: string;
};

export function ArticleShare({title, url}: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className={styles.share} aria-label="Compartilhar artigo">
      <p className={styles.label}>Compartilhar</p>

      <div className={styles.actions}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.whatsapp}`}
        >
          WhatsApp
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.facebook}`}
        >
          Facebook
        </a>

        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.x}`}
        >
          X
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.telegram}`}
        >
          Telegram
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className={`${styles.button} ${styles.copy}`}
        >
          {copied ? 'Link copiado' : 'Copiar link'}
        </button>
      </div>
    </section>
  );
}
