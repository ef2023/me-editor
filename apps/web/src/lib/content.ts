export type SiteCategory = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
};

export type ArticleSection = {
  title: string;
  paragraphs: string[];
};

export type ArticlePost = {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  pillar: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  relatedSlugs: string[];
  sections: ArticleSection[];
};

const categories: SiteCategory[] = [
  {
    slug: 'significados-biblicos',
    title: 'Significados Bíblicos',
    description:
      'Termos, conceitos e expressões bíblicas explicados com clareza, contexto e aplicação.',
    eyebrow: 'Base conceitual',
  },
  {
    slug: 'estudos-biblicos',
    title: 'Estudos Bíblicos',
    description:
      'Guias, panoramas e estudos organizados para aprofundar a leitura das Escrituras.',
    eyebrow: 'Aprofundamento',
  },
  {
    slug: 'livros-da-biblia',
    title: 'Livros da Bíblia',
    description:
      'Resumos, panoramas e chaves de leitura para livros do Antigo e do Novo Testamento.',
    eyebrow: 'Panoramas',
  },
  {
    slug: 'doutrina-e-fundamentos',
    title: 'Doutrina e Fundamentos',
    description:
      'Assuntos centrais da fé cristã explicados com responsabilidade teológica e linguagem acessível.',
    eyebrow: 'Fundamentos',
  },
  {
    slug: 'vida-crista-pratica',
    title: 'Vida Cristã Prática',
    description:
      'Aplicações da fé para o cotidiano, decisões, desafios e amadurecimento cristão.',
    eyebrow: 'Cotidiano',
  },
  {
    slug: 'oracao-e-devocional',
    title: 'Oração e Devocional',
    description:
      'Oração, disciplina espiritual e comunhão com Deus tratadas com profundidade e simplicidade.',
    eyebrow: 'Vida devocional',
  },
  {
    slug: 'personagens-biblicos',
    title: 'Personagens Bíblicos',
    description:
      'Histórias, lições e relevância de personagens centrais da narrativa bíblica.',
    eyebrow: 'Narrativa bíblica',
  },
  {
    slug: 'temas-e-versiculos',
    title: 'Temas e Versículos',
    description:
      'Versículos por tema com contexto, curadoria e explicação responsável.',
    eyebrow: 'Curadoria bíblica',
  },
  {
    slug: 'perguntas-dificeis',
    title: 'Perguntas Difíceis',
    description:
      'Questões delicadas e dúvidas reais abordadas com sobriedade e honestidade.',
    eyebrow: 'Dúvidas reais',
  },
  {
    slug: 'familia-e-relacionamentos',
    title: 'Família e Relacionamentos',
    description:
      'Casamento, filhos, reconciliação e vida relacional à luz da Bíblia.',
    eyebrow: 'Relacionamentos',
  },
  {
    slug: 'igreja-e-discipulado',
    title: 'Igreja e Discipulado',
    description:
      'Vida comunitária, discipulado, congregação e formação cristã no contexto da igreja.',
    eyebrow: 'Comunidade cristã',
  },
  {
    slug: 'datas-e-especiais',
    title: 'Datas e Especiais',
    description:
      'Páscoa, Natal, Semana Santa e outros temas sazonais tratados com profundidade.',
    eyebrow: 'Calendário cristão',
  },
];

const posts: ArticlePost[] = [
  {
    slug: 'o-que-significa-evangelho-na-biblia',
    categorySlug: 'significados-biblicos',
    title: 'O que significa evangelho na Bíblia',
    excerpt:
      'Entenda o significado bíblico de evangelho, seu núcleo central e por que essa palavra é decisiva para a fé cristã.',
    eyebrow: 'Significados Bíblicos',
    pillar: 'Evangelho, salvação, graça e fé',
    readingTime: '8 min de leitura',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-18',
    tags: ['evangelho', 'salvação', 'graça'],
    relatedSlugs: [
      'o-que-e-salvacao-no-cristianismo',
      'resumo-do-evangelho-de-joao',
      'como-orar-segundo-a-biblia',
    ],
    sections: [
      {
        title: 'O sentido básico da palavra evangelho',
        paragraphs: [
          'No uso bíblico, evangelho aponta para a boa notícia do que Deus fez em Jesus Cristo para salvar pecadores e reconciliar pessoas consigo.',
          'Não é apenas uma mensagem moral nem um conjunto de conselhos espirituais. É anúncio: Deus agiu na história, e essa ação tem implicações eternas e práticas.',
        ],
      },
      {
        title: 'Por que evangelho é mais do que religião',
        paragraphs: [
          'Quando a Bíblia fala do evangelho, ela não está tratando somente de regras ou identidade religiosa. O centro é Cristo, sua vida, sua morte e sua ressurreição.',
          'Por isso, o evangelho não chama a pessoa apenas para melhorar comportamentos, mas para responder em fé, arrependimento e nova vida.',
        ],
      },
      {
        title: 'Como aplicar esse entendimento hoje',
        paragraphs: [
          'Entender o evangelho com clareza muda a forma de ler a Bíblia, enxergar a igreja, compreender a graça e lidar com culpa, esperança e propósito.',
          'Na prática, isso significa que toda a vida cristã nasce da obra de Cristo, não da tentativa humana de merecer aceitação.',
        ],
      },
    ],
  },
  {
    slug: 'o-que-e-salvacao-no-cristianismo',
    categorySlug: 'doutrina-e-fundamentos',
    title: 'O que é salvação no cristianismo',
    excerpt:
      'Um guia introdutório para entender salvação, reconciliação com Deus, graça, fé e transformação.',
    eyebrow: 'Doutrina e Fundamentos',
    pillar: 'Evangelho, salvação, graça e fé',
    readingTime: '9 min de leitura',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-18',
    tags: ['salvação', 'fé', 'justificação'],
    relatedSlugs: [
      'o-que-significa-evangelho-na-biblia',
      'resumo-do-evangelho-de-joao',
      'versiculos-sobre-esperanca-com-explicacao',
    ],
    sections: [
      {
        title: 'Salvação é iniciativa de Deus',
        paragraphs: [
          'No cristianismo, salvação começa em Deus e não no esforço humano. Ela envolve perdão, reconciliação, nova vida e esperança futura.',
          'A linguagem bíblica da salvação é rica: inclui libertação, justificação, adoção, santificação e a esperança da plena restauração.',
        ],
      },
      {
        title: 'A relação entre graça e fé',
        paragraphs: [
          'Graça destaca a iniciativa misericordiosa de Deus; fé é a resposta de confiança em Cristo.',
          'A salvação, portanto, não é comprada nem produzida por mérito. Ela é recebida e passa a transformar a vida inteira.',
        ],
      },
      {
        title: 'O que muda na vida prática',
        paragraphs: [
          'A salvação não termina em uma decisão inicial. Ela inaugura um caminho de discipulado, crescimento e perseverança.',
          'Isso impacta identidade, arrependimento, vida comunitária, oração e esperança em meio às lutas.',
        ],
      },
    ],
  },
  {
    slug: 'como-orar-segundo-a-biblia',
    categorySlug: 'oracao-e-devocional',
    title: 'Como orar segundo a Bíblia',
    excerpt:
      'Um guia claro sobre oração cristã: reverência, sinceridade, perseverança e dependência de Deus.',
    eyebrow: 'Oração e Devocional',
    pillar: 'Oração e vida devocional',
    readingTime: '7 min de leitura',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-18',
    tags: ['oração', 'devocional', 'vida cristã'],
    relatedSlugs: [
      'versiculos-sobre-esperanca-com-explicacao',
      'o-que-significa-evangelho-na-biblia',
      'o-que-e-salvacao-no-cristianismo',
    ],
    sections: [
      {
        title: 'Oração não é performance',
        paragraphs: [
          'A oração bíblica não depende de fórmulas para impressionar Deus. Ela é expressão de relacionamento, dependência e confiança.',
          'Por isso, a sinceridade importa mais do que eloquência. A oração cristã é reverente, mas também filial.',
        ],
      },
      {
        title: 'Elementos saudáveis de uma vida de oração',
        paragraphs: [
          'Louvor, confissão, gratidão, intercessão e súplica são movimentos recorrentes na oração bíblica.',
          'A regularidade também importa. A vida devocional amadurece quando deixa de ser só reação a crises e passa a ser disciplina de comunhão.',
        ],
      },
      {
        title: 'Como começar de forma simples',
        paragraphs: [
          'Comece com constância e honestidade. Separe tempo, abra a Bíblia, responda ao que foi lido em oração e aprenda a apresentar suas cargas diante de Deus.',
          'Ao longo do tempo, a oração deixa de ser um dever seco e se torna parte central da caminhada cristã.',
        ],
      },
    ],
  },
  {
    slug: 'versiculos-sobre-esperanca-com-explicacao',
    categorySlug: 'temas-e-versiculos',
    title: 'Versículos sobre esperança com explicação',
    excerpt:
      'Uma curadoria de passagens bíblicas sobre esperança, com contexto e aplicação responsável.',
    eyebrow: 'Temas e Versículos',
    pillar: 'Versículos por tema',
    readingTime: '6 min de leitura',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-18',
    tags: ['esperança', 'versículos', 'consolo'],
    relatedSlugs: [
      'como-orar-segundo-a-biblia',
      'o-que-e-salvacao-no-cristianismo',
      'resumo-do-evangelho-de-joao',
    ],
    sections: [
      {
        title: 'Esperança bíblica não é otimismo vazio',
        paragraphs: [
          'Na Bíblia, esperança não é mera expectativa positiva sem fundamento. Ela nasce do caráter de Deus, de suas promessas e de sua fidelidade.',
          'Isso significa que a esperança cristã pode conviver com lágrimas, lutas e espera sem perder profundidade.',
        ],
      },
      {
        title: 'Como usar versículos com responsabilidade',
        paragraphs: [
          'Versículos por tema são úteis quando lidos no seu contexto e ligados ao centro da mensagem bíblica.',
          'O objetivo não é montar uma coleção de frases soltas, mas deixar que a Escritura forme convicção, consolo e perseverança.',
        ],
      },
      {
        title: 'Aplicação prática para dias difíceis',
        paragraphs: [
          'Em tempos de pressão, medo ou cansaço, a esperança bíblica lembra que Deus não abandona seu povo e conduz a história com propósito.',
          'Por isso, ler, meditar e orar com essas passagens fortalece o coração sem reduzir a fé a slogans.',
        ],
      },
    ],
  },
  {
    slug: 'resumo-do-evangelho-de-joao',
    categorySlug: 'livros-da-biblia',
    title: 'Resumo do Evangelho de João',
    excerpt:
      'Panorama do Evangelho de João: propósito, estrutura, ênfases teológicas e leitura prática.',
    eyebrow: 'Livros da Bíblia',
    pillar: 'Livros da Bíblia e panoramas',
    readingTime: '10 min de leitura',
    publishedAt: '2026-03-18',
    updatedAt: '2026-03-18',
    tags: ['joão', 'evangelhos', 'cristo'],
    relatedSlugs: [
      'o-que-significa-evangelho-na-biblia',
      'o-que-e-salvacao-no-cristianismo',
      'versiculos-sobre-esperanca-com-explicacao',
    ],
    sections: [
      {
        title: 'O propósito do Evangelho de João',
        paragraphs: [
          'João organiza seu relato para apresentar Jesus como o Cristo, o Filho de Deus, e conduzir o leitor à fé.',
          'Seu texto combina profundidade teológica com clareza pastoral, tornando-o uma porta excelente para novos leitores e para estudo mais sério.',
        ],
      },
      {
        title: 'Temas centrais do livro',
        paragraphs: [
          'Vida, luz, verdade, glória, sinais, testemunho e fé aparecem de forma recorrente.',
          'João mostra que conhecer Cristo não é acumular informação religiosa, mas responder a quem Ele é.',
        ],
      },
      {
        title: 'Como ler João com proveito',
        paragraphs: [
          'Vale observar os sinais, os discursos longos de Jesus e a progressão entre incredulidade e fé.',
          'Ler João com calma ajuda a enxergar o evangelho não como ideia abstrata, mas como revelação da pessoa e da obra de Cristo.',
        ],
      },
    ],
  },
];

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getAllPosts() {
  return [...posts];
}

export function getPostsByCategory(categorySlug: string) {
  return posts
    .filter((post) => post.categorySlug === categorySlug)
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export function getPostByCategoryAndSlug(categorySlug: string, slug: string) {
  return posts.find((post) => post.categorySlug === categorySlug && post.slug === slug);
}

export function getRelatedPosts(post: ArticlePost, limit = 3) {
  const relatedFromList = post.relatedSlugs
    .map((slug) => posts.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ArticlePost => Boolean(candidate));

  const fallback = posts.filter(
    (candidate) =>
      candidate.slug !== post.slug &&
      candidate.categorySlug === post.categorySlug &&
      !relatedFromList.some((item) => item.slug === candidate.slug),
  );

  return [...relatedFromList, ...fallback].slice(0, limit);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
  }).format(new Date(`${date}T00:00:00`));
}