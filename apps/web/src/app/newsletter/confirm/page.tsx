import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';

type PageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const messages: Record<string, {title: string; description: string}> = {
  confirmed: {
    title: 'Inscrição confirmada',
    description: 'Seu e-mail foi confirmado com sucesso na newsletter.',
  },
  invalid: {
    title: 'Link inválido',
    description: 'O link de confirmação está incompleto ou inválido.',
  },
  missing: {
    title: 'Solicitação não encontrada',
    description: 'Não encontramos um pedido pendente para este e-mail.',
  },
  expired: {
    title: 'Link expirado',
    description: 'O prazo de confirmação expirou. Faça uma nova inscrição.',
  },
};

export default async function NewsletterConfirmPage({searchParams}: PageProps) {
  const {status = 'invalid'} = await searchParams;
  const message = messages[status] ?? messages.invalid;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="section">
          <div className="container-content">
            <div
              style={{
                display: 'grid',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-border-strong)',
              }}
            >
              <p className="eyebrow">Newsletter</p>
              <h1>{message.title}</h1>
              <p>{message.description}</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}