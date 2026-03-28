'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import styles from './cookie-consent-banner.module.scss';

type ConsentChoice = 'accepted' | 'rejected';

const STORAGE_KEY = 'me_cookie_consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

function readCookie(name: string) {
  if (typeof document === 'undefined') {
    return '';
  }

  const escaped = name.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escaped}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : '';
}

function persistConsent(choice: ConsentChoice) {
  localStorage.setItem(STORAGE_KEY, choice);

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
    choice,
  )}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function applyConsent(choice: ConsentChoice) {
  const analyticsStorage = choice === 'accepted' ? 'granted' : 'denied';

  const consentPayload = {
    analytics_storage: analyticsStorage,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  };

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  if (typeof win.gtag === 'function') {
    win.gtag('consent', 'update', consentPayload);
  }

  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({
      event: 'cookie_consent_updated',
      cookie_consent_status: choice,
    });
  }
}

export function CookieConsentBanner() {
  const [storedConsent] = useState<ConsentChoice | ''>(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    const localStored = localStorage.getItem(STORAGE_KEY) as
      | ConsentChoice
      | null;
    const cookieStored = readCookie(STORAGE_KEY) as ConsentChoice | '';

    return localStored || cookieStored;
  });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (storedConsent === 'accepted' || storedConsent === 'rejected') {
      applyConsent(storedConsent);
    }
  }, [storedConsent]);

  function handleConsent(choice: ConsentChoice) {
    persistConsent(choice);
    applyConsent(choice);
    setIsDismissed(true);
  }

  const isVisible =
    !isDismissed &&
    storedConsent !== 'accepted' &&
    storedConsent !== 'rejected';

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de cookies"
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>Cookies</p>
        <h2 className={styles.title}>Seu controle sobre cookies e analytics</h2>
        <p className={styles.description}>
          Usamos cookies necessários para o funcionamento do portal e, com sua
          permissão, cookies analíticos para medir audiência com o Google
          Analytics. O Speed Insights permanece ativo como medição técnica
          anônima de desempenho.
        </p>
        <p className={styles.help}>
          Leia nossa{' '}
          <Link href="/politica-de-cookies" className={styles.link}>
            Política de Cookies
          </Link>{' '}
          para entender os detalhes.
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => handleConsent('rejected')}
        >
          Continuar apenas com necessários
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => handleConsent('accepted')}
        >
          Aceitar analytics
        </button>
      </div>
    </aside>
  );
}
