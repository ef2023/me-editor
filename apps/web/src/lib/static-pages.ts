export type StaticPageSection = {
  title: string;
  body: string[];
};

export type StaticPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: StaticPageSection[];
};

export const staticPages: Record<string, StaticPageContent> = {
  sobre: {
    eyebrow: 'Institucional',
    title: 'Sobre o Mistério do Evangelho',
    description:
      'Conheça o propósito editorial, a visão do portal e o compromisso com clareza bíblica, revisão e responsabilidade.',
    sections: [
      {
        title: 'Propósito do portal',
        body: [
          'O Mistério do Evangelho nasce como um portal cristão editorial voltado à explicação bíblica, formação cristã prática e interpretação responsável.',
          'Nosso objetivo é servir leitores que desejam entender melhor a Bíblia, amadurecer na fé e encontrar conteúdo sério, claro e útil.',
        ],
      },
      {
        title: 'O que nos diferencia',
        body: [
          'Não buscamos volume vazio, sensacionalismo religioso nem produção automática em massa.',
          'A proposta é construir uma biblioteca viva de conteúdos úteis, com boa arquitetura, navegação clara e compromisso com qualidade editorial.',
        ],
      },
      {
        title: 'Compromisso editorial',
        body: [
          'Priorizamos linguagem acessível, revisão humana, coerência de tom e responsabilidade em temas sensíveis.',
          'Sempre que necessário, o conteúdo deve reconhecer nuances interpretativas sem perder clareza e honestidade.',
        ],
      },
    ],
  },
  contato: {
    eyebrow: 'Institucional',
    title: 'Contato',
    description:
      'Canal institucional para dúvidas, sugestões, correções editoriais e assuntos relacionados ao portal.',
    sections: [
      {
        title: 'Como falar conosco',
        body: [
          'Para contato editorial, sugestões de pauta, relato de erro ou dúvidas gerais, utilize o e-mail institucional do projeto.',
          'Antes de produção, substitua o endereço de e-mail padrão pelo endereço oficial do domínio.',
        ],
      },
      {
        title: 'Escopo do canal',
        body: [
          'Este canal é destinado a questões institucionais e editoriais.',
          'Pedidos de aconselhamento pastoral individual, urgências pessoais e temas sensíveis que exijam acompanhamento local devem ser encaminhados ao contexto adequado, como liderança cristã responsável e apoio presencial quando necessário.',
        ],
      },
      {
        title: 'Prazo e postura',
        body: [
          'Nos esforçamos para responder com clareza, respeito e objetividade.',
          'Mensagens ofensivas, spam ou solicitações incompatíveis com a natureza do portal podem não receber retorno.',
        ],
      },
    ],
  },
  'politica-de-privacidade': {
    eyebrow: 'Política',
    title: 'Política de Privacidade',
    description:
      'Diretrizes sobre coleta, uso, armazenamento e proteção de dados no contexto do portal.',
    sections: [
      {
        title: 'Dados tratados',
        body: [
          'Podemos tratar dados informados voluntariamente em formulários, além de dados técnicos e estatísticos coletados por ferramentas de analytics, segurança e desempenho.',
          'Esses dados podem incluir endereço IP, informações do navegador, páginas visitadas, tempo de navegação e interações básicas com o site.',
        ],
      },
      {
        title: 'Finalidades do tratamento',
        body: [
          'Os dados são utilizados para operação do portal, medição de desempenho, melhoria da experiência do usuário, segurança e eventual comunicação quando o usuário opta por isso.',
          'Não tratamos dados para finalidades incompatíveis com a natureza editorial do projeto.',
        ],
      },
      {
        title: 'Direitos e solicitações',
        body: [
          'Usuários podem solicitar informações sobre tratamento de dados, correção de informações e esclarecimentos adicionais, conforme aplicável.',
          'Pedidos devem ser encaminhados pelo canal institucional informado na página de contato.',
        ],
      },
    ],
  },
  'politica-de-cookies': {
    eyebrow: 'Política',
    title: 'Política de Cookies',
    description:
      'Explicação sobre cookies, finalidades de uso e opções relacionadas à experiência do usuário.',
    sections: [
      {
        title: 'O que são cookies',
        body: [
          'Cookies são pequenos arquivos armazenados no dispositivo do usuário para melhorar navegação, lembrar preferências e medir desempenho.',
          'Dependendo da configuração do portal, cookies podem ser próprios ou de terceiros.',
        ],
      },
      {
        title: 'Como utilizamos',
        body: [
          'Os cookies podem ser usados para funcionamento básico do site, analytics, medição de uso, preferências e monetização quando aplicável.',
          'A configuração exata depende dos serviços ativados no ambiente de produção.',
        ],
      },
      {
        title: 'Preferências do usuário',
        body: [
          'Sempre que houver mecanismo de consentimento aplicável, o usuário poderá revisar e ajustar preferências compatíveis com a implementação do portal.',
          'Também é possível controlar cookies diretamente no navegador, observadas as limitações dessa escolha.',
        ],
      },
    ],
  },
  'termos-de-uso': {
    eyebrow: 'Política',
    title: 'Termos de Uso',
    description:
      'Condições gerais de uso do portal, limites de responsabilidade e regras básicas de navegação.',
    sections: [
      {
        title: 'Natureza do conteúdo',
        body: [
          'O conteúdo publicado possui finalidade informativa, editorial e formativa dentro do escopo cristão do portal.',
          'A leitura do material não substitui acompanhamento pastoral local, aconselhamento profissional qualificado nem avaliação jurídica ou médica quando cabível.',
        ],
      },
      {
        title: 'Uso permitido',
        body: [
          'É permitido utilizar o portal para leitura, estudo pessoal e compartilhamento responsável por meios legítimos.',
          'Não é permitido copiar integralmente o conteúdo para republicação, raspagem automatizada, distribuição não autorizada ou uso que desfigure a autoria e a integridade editorial.',
        ],
      },
      {
        title: 'Atualizações e disponibilidade',
        body: [
          'O portal pode atualizar conteúdos, estrutura, funcionalidades e políticas a qualquer momento para melhorar qualidade, conformidade e operação.',
          'Também não garantimos disponibilidade contínua e ininterrupta em todos os contextos técnicos.',
        ],
      },
    ],
  },
  'aviso-editorial': {
    eyebrow: 'Editorial',
    title: 'Aviso Editorial',
    description:
      'Como o conteúdo é planejado, escrito, revisado, atualizado e publicado no Mistério do Evangelho.',
    sections: [
      {
        title: 'Como produzimos conteúdo',
        body: [
          'Os artigos seguem uma linha editorial orientada a clareza bíblica, responsabilidade interpretativa e utilidade prática.',
          'Toda peça relevante deve passar por revisão editorial, revisão de clareza e conferência estrutural antes da publicação.',
        ],
      },
      {
        title: 'Uso de tecnologia e IA',
        body: [
          'Ferramentas tecnológicas podem apoiar organização, pesquisa inicial, estruturação e produtividade.',
          'O texto final, porém, exige curadoria, responsabilidade e supervisão humana real.',
        ],
      },
      {
        title: 'Atualização e transparência',
        body: [
          'Conteúdos podem ser revisados, corrigidos, consolidados e ampliados conforme necessidade editorial.',
          'Quando apropriado, o portal informa data de publicação, atualização e contexto institucional para fortalecer transparência e confiança.',
        ],
      },
    ],
  },
};