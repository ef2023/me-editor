'use client';

import {FormEvent, useState} from 'react';
import styles from '@/components/home/home-sections.module.scss';

type NewsletterStatus = 'idle' | 'pending' | 'success' | 'invalid' | 'error';

type NewsletterInlineFormProps = {
  redirectTo?: string;
  source?: string;
  successMessage?: string;
};

export function NewsletterInlineForm({
  redirectTo = '/',
  source = 'home',
  successMessage = 'Confira seu e-mail para confirmar a inscrição.',
}: NewsletterInlineFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('pending');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('redirectTo', redirectTo);
      formData.append('source', source);

      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: formData,
        headers: {
          'x-newsletter-ajax': '1',
        },
      });

      const data = (await response.json()) as {
        ok?: boolean;
        status?: 'pending' | 'invalid' | 'error';
        message?: string;
      };

      if (!response.ok || !data?.status) {
        setStatus('error');
        setMessage('Não foi possível processar sua inscrição agora.');
        return;
      }

      if (data.status === 'pending') {
        setStatus('success');
        setMessage(data.message || successMessage);
        setEmail('');
        return;
      }

      if (data.status === 'invalid') {
        setStatus('invalid');
        setMessage(data.message || 'Digite um e-mail válido para continuar.');
        return;
      }

      setStatus('error');
      setMessage(data.message || 'Não foi possível processar sua inscrição agora.');
    } catch {
      setStatus('error');
      setMessage('Não foi possível processar sua inscrição agora.');
    }
  }

  return (
    <div className={styles.newsletterWrap}>
      <form onSubmit={handleSubmit} className={styles.newsletterForm}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <input type="hidden" name="source" value={source} />
        <input
          type="email"
          name="email"
          placeholder="Seu melhor e-mail"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.newsletterInput}
          aria-label="Seu melhor e-mail"
        />
        <button
          type="submit"
          className={styles.newsletterButton}
          disabled={status === 'pending'}
        >
          {status === 'pending' ? 'Enviando...' : 'Confirmar por e-mail'}
        </button>
      </form>

      {message ? (
        <p
          className={styles.newsletterHelp}
          aria-live="polite"
          data-status={status}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
