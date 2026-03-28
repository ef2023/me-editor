import type {ArticlePost, SiteCategory} from '@/lib/content';
import {
  formatDate as formatLocalDate,
  getAllPosts as getLocalAllPosts,
  getCategories as getLocalCategories,
  getPostByCategoryAndSlug as getLocalPostByCategoryAndSlug,
  getRelatedPosts as getLocalRelatedPosts,
} from '@/lib/content';
import {siteConfig} from '@/lib/site';
import {staticPages, type StaticPageContent} from '@/lib/static-pages';
import {sanityFetch} from '@/lib/sanity/fetch';
import {hasSanityEnv} from '@/lib/sanity/env';
import {
  allAuthorsQuery,
  allCategoriesQuery,
  allPostsQuery,
  authorBySlugQuery,
  categoryBySlugQuery,
  homePageQuery,
  legalPageBySlugQuery,
  postByCategoryAndSlugQuery,
  postsByAuthorQuery,
  postsByCategoryCountQuery,
  postsByCategoryPageQuery,
  relatedPostsQuery,
  searchPostsCountQuery,
  searchPostsPageQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';

import type {PortableTextBlock} from '@portabletext/types';

type PortableBlock = PortableTextBlock;

export type SanityImageValue = {
  alt?: string;
  crop?: unknown;
  hotspot?: unknown;
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
};

export type CmsAuthor = {
  name: string;
  slug: string;
  role?: string;
  shortBio?: string;
  bio?: PortableBlock[];
  expertise?: string[];
  links?: Array<{label: string; href: string}>;
  image?: SanityImageValue;
};

export type CmsArticlePost = ArticlePost & {
  body?: PortableBlock[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
  featured?: boolean;
  author?: CmsAuthor;
  coverImage?: SanityImageValue;
};

export type ModularSection =
  | {
      _type: 'richTextSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      body?: PortableBlock[];
    }
  | {
      _type: 'faqSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      items?: Array<{question?: string; answer?: string}>;
    }
  | {
      _type: 'curatedPostsSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      posts: CmsArticlePost[];
    }
  | {
      _type: 'ctaBanner';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      buttonLabel?: string;
      buttonHref?: string;
      showNewsletterForm?: boolean;
      successMessage?: string;
    };

export type CmsCategory = SiteCategory & {
  heroTitle?: string;
  heroDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
  sections?: ModularSection[];
};

export type CmsLegalPage = Omit<StaticPageContent, 'sections'> & {
  body?: PortableBlock[];
  sections?: ModularSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
};

type SanityAuthor = {
  name: string;
  slug: string;
  role?: string;
  shortBio?: string;
  bio?: PortableBlock[];
  expertise?: string[];
  links?: Array<{label: string; href: string}>;
  image?: SanityImageValue;
};

type SanityPost = {
  title: string;
  slug: string;
  excerpt?: string;
  eyebrow?: string;
  pillar?: string;
  featured?: boolean;
  readingTime?: number | string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImageValue;
  };
  body?: PortableBlock[];
  coverImage?: SanityImageValue;
  categorySlug: string;
  author?: SanityAuthor;
};

type SanityCategory = {
  title: string;
  slug: string;
  description?: string;
  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImageValue;
  };
  sections?: Array<{
    _type: string;
    _key: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
    showNewsletterForm?: boolean;
    successMessage?: string;
    posts?: SanityPost[];
    body?: PortableBlock[];
    items?: Array<{question?: string; answer?: string}>;
  }>;
};

type SanityLegalPage = {
  title?: string;
  eyebrow?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImageValue;
  };
  sections?: Array<{
    _type: string;
    _key: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
    showNewsletterForm?: boolean;
    successMessage?: string;
    body?: PortableBlock[];
    items?: Array<{question?: string; answer?: string}>;
  }>;
};

type SanitySiteSettings = {
  siteTitle?: string;
  tagline?: string;
  description?: string;
  heroTitle?: string;
  heroDescription?: string;
  footerDescription?: string;
};

type SanityHomeSection = {
  _type: string;
  _key: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  useAllCategories?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
  showNewsletterForm?: boolean;
  successMessage?: string;
  featuredPost?: SanityPost;
  posts?: SanityPost[];
  categories?: SanityCategory[];
  paths?: Array<{
    step?: string;
    title?: string;
    description?: string;
    post?: SanityPost;
  }>;
  items?: Array<{
    title?: string;
    description?: string;
  }>;
};

type SanityHomePage = {
  sections?: SanityHomeSection[];
};

export type HomeSection =
  | {
      _type: 'heroSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      primaryLabel?: string;
      primaryHref?: string;
      secondaryLabel?: string;
      secondaryHref?: string;
      featuredPost?: CmsArticlePost;
    }
  | {
      _type: 'curatedPostsSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      posts: CmsArticlePost[];
    }
  | {
      _type: 'readingPathsSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      paths: Array<{
        step?: string;
        title?: string;
        description?: string;
        post?: CmsArticlePost;
      }>;
    }
  | {
      _type: 'principlesSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      items: Array<{
        title?: string;
        description?: string;
      }>;
    }
  | {
      _type: 'categoryGridSection';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      useAllCategories?: boolean;
      categories?: CmsCategory[];
    }
  | {
      _type: 'ctaBanner';
      _key: string;
      eyebrow?: string;
      title?: string;
      description?: string;
      buttonLabel?: string;
      buttonHref?: string;
      showNewsletterForm?: boolean;
      successMessage?: string;
    };

export type HomePageContent = {
  sections: HomeSection[];
};

export type CategoryListingResult = {
  category?: CmsCategory;
  posts: CmsArticlePost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SearchPageResult = {
  items: CmsArticlePost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SiteSettings = {
  siteTitle: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  footerDescription: string;
};

const fallbackAuthor: CmsAuthor = {
  name: 'Equipe editorial',
  slug: 'equipe-editorial',
  role: 'Redação',
  shortBio: 'Conteúdo inicial enquanto o CMS ainda está sendo povoado.',
  bio: [],
  expertise: ['Editorial'],
  links: [],
};

const fallbackSiteSettings: SiteSettings = {
  siteTitle: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  heroTitle: siteConfig.tagline,
  heroDescription:
    'Uma base editorial séria para explicar temas bíblicos, responder dúvidas reais e formar um portal cristão confiável, elegante e preparado para crescer com SEO e AdSense no tempo certo.',
  footerDescription:
    'Portal cristão de explicação bíblica, formação cristã prática e interpretação responsável.',
};

function normalizeDate(value?: string) {
  return (value ?? new Date().toISOString()).slice(0, 10);
}

function normalizeReadingTime(value?: number | string) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value} min de leitura`;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  return '6 min de leitura';
}

function mapAuthor(author?: SanityAuthor): CmsAuthor | undefined {
  if (!author?.slug) {
    return undefined;
  }

  return {
    name: author.name,
    slug: author.slug,
    role: author.role,
    shortBio: author.shortBio,
    bio: author.bio ?? [],
    expertise: author.expertise ?? [],
    links: author.links ?? [],
    image: author.image,
  };
}

function mapPost(post: SanityPost): CmsArticlePost {
  return {
    slug: post.slug,
    categorySlug: post.categorySlug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    eyebrow: post.eyebrow ?? 'Editorial',
    pillar: post.pillar ?? 'Conteúdo editorial',
    readingTime: normalizeReadingTime(post.readingTime),
    publishedAt: normalizeDate(post.publishedAt),
    updatedAt: normalizeDate(post.updatedAt ?? post.publishedAt),
    tags: post.tags ?? [],
    relatedSlugs: [],
    sections: [],
    body: post.body ?? [],
    seoTitle: post.seo?.title,
    seoDescription: post.seo?.description,
    seoImage: post.seo?.image,
    featured: post.featured ?? false,
    author: mapAuthor(post.author) ?? fallbackAuthor,
    coverImage: post.coverImage,
  };
}

function mapLocalPost(post: ArticlePost): CmsArticlePost {
  return {
    ...post,
    body: [],
    seoTitle: post.title,
    seoDescription: post.excerpt,
    seoImage: undefined,
    featured: post.slug === 'resumo-do-evangelho-de-joao',
    author: fallbackAuthor,
    coverImage: undefined,
  };
}

function mapModularSections(
  sections:
    | Array<{
        _type: string;
        _key: string;
        eyebrow?: string;
        title?: string;
        description?: string;
        buttonLabel?: string;
        buttonHref?: string;
        showNewsletterForm?: boolean;
        successMessage?: string;
        posts?: SanityPost[];
        body?: PortableBlock[];
        items?: Array<{question?: string; answer?: string}>;
      }>
    | undefined,
): ModularSection[] {
  return (sections ?? []).map((section) => {
    switch (section._type) {
      case 'richTextSection':
        return {
          _type: 'richTextSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          body: section.body ?? [],
        };
      case 'faqSection':
        return {
          _type: 'faqSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          items: section.items ?? [],
        };
      case 'curatedPostsSection':
        return {
          _type: 'curatedPostsSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          posts: (section.posts ?? []).map(mapPost),
        };
      case 'ctaBanner':
      default:
        return {
          _type: 'ctaBanner',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          buttonLabel: section.buttonLabel,
          buttonHref: section.buttonHref,
          showNewsletterForm: section.showNewsletterForm,
          successMessage: section.successMessage,
        };
    }
  });
}

function mapCategory(category: SanityCategory): CmsCategory {
  return {
    slug: category.slug,
    title: category.title,
    description: category.description ?? '',
    eyebrow: category.eyebrow ?? 'Editorial',
    heroTitle: category.heroTitle,
    heroDescription: category.heroDescription,
    seoTitle: category.seo?.title,
    seoDescription: category.seo?.description,
    seoImage: category.seo?.image,
    sections: mapModularSections(category.sections),
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanityEnv) {
    return fallbackSiteSettings;
  }

  const {data} = await sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
    revalidate: 60,
  });

  if (!data) {
    return fallbackSiteSettings;
  }

  return {
    siteTitle: data.siteTitle ?? fallbackSiteSettings.siteTitle,
    tagline: data.tagline ?? fallbackSiteSettings.tagline,
    description: data.description ?? fallbackSiteSettings.description,
    heroTitle: data.heroTitle ?? fallbackSiteSettings.heroTitle,
    heroDescription: data.heroDescription ?? fallbackSiteSettings.heroDescription,
    footerDescription:
      data.footerDescription ?? fallbackSiteSettings.footerDescription,
  };
}

export async function getHomePage(): Promise<HomePageContent> {
  const fallbackPosts = getLocalAllPosts().map(mapLocalPost);
  const fallbackCategories = getLocalCategories().map((category) => ({
    ...category,
    sections: [],
  }));

  const fallback: HomePageContent = {
    sections: [
      {
        _type: 'heroSection',
        _key: 'fallback-hero',
        eyebrow: 'Portal cristão editorial',
        title: fallbackSiteSettings.heroTitle,
        description: fallbackSiteSettings.heroDescription,
        primaryLabel: 'Conhecer o projeto',
        primaryHref: '/sobre',
        secondaryLabel: 'Buscar conteúdos',
        secondaryHref: '/busca',
        featuredPost: fallbackPosts[0],
      },
      {
        _type: 'curatedPostsSection',
        _key: 'fallback-start',
        eyebrow: 'Comece por aqui',
        title: 'Os primeiros textos precisam orientar, não apenas ocupar espaço.',
        description:
          'Esta entrada inicial organiza a leitura do portal em torno do núcleo mais importante.',
        posts: fallbackPosts.slice(0, 3),
      },
      {
        _type: 'categoryGridSection',
        _key: 'fallback-cat',
        eyebrow: 'Navegue por assunto',
        title: 'A taxonomia nasce curta, clara e pronta para crescer com ordem.',
        description: 'Categorias úteis e estáveis desde o começo.',
        useAllCategories: true,
        categories: fallbackCategories,
      },
      {
        _type: 'ctaBanner',
        _key: 'fallback-cta',
        eyebrow: 'Continue acompanhando',
        title: 'Receba os próximos conteúdos do portal',
        description: 'Cadastre seu e-mail para acompanhar a evolução editorial.',
        showNewsletterForm: true,
        successMessage: 'Confira seu e-mail para confirmar a inscrição.',
      },
    ],
  };

  if (!hasSanityEnv) {
    return fallback;
  }

  const {data} = await sanityFetch<SanityHomePage | null>({
    query: homePageQuery,
    tags: ['homePage', 'post', 'category', 'author'],
    revalidate: 60,
  });

  if (!data?.sections?.length) {
    return fallback;
  }

  const sections: HomeSection[] = data.sections.map((section) => {
    switch (section._type) {
      case 'heroSection':
        return {
          _type: 'heroSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          primaryLabel: section.primaryLabel,
          primaryHref: section.primaryHref,
          secondaryLabel: section.secondaryLabel,
          secondaryHref: section.secondaryHref,
          featuredPost: section.featuredPost ? mapPost(section.featuredPost) : undefined,
        };
      case 'curatedPostsSection':
        return {
          _type: 'curatedPostsSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          posts: (section.posts ?? []).map(mapPost),
        };
      case 'readingPathsSection':
        return {
          _type: 'readingPathsSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          paths: (section.paths ?? []).map((item) => ({
            step: item.step,
            title: item.title,
            description: item.description,
            post: item.post ? mapPost(item.post) : undefined,
          })),
        };
      case 'principlesSection':
        return {
          _type: 'principlesSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          items: section.items ?? [],
        };
      case 'categoryGridSection':
        return {
          _type: 'categoryGridSection',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          useAllCategories: section.useAllCategories,
          categories: (section.categories ?? []).map(mapCategory),
        };
      case 'ctaBanner':
      default:
        return {
          _type: 'ctaBanner',
          _key: section._key,
          eyebrow: section.eyebrow,
          title: section.title,
          description: section.description,
          buttonLabel: section.buttonLabel,
          buttonHref: section.buttonHref,
          showNewsletterForm: section.showNewsletterForm,
          successMessage: section.successMessage,
        };
    }
  });

  return {sections};
}

export async function getCategories(): Promise<CmsCategory[]> {
  if (!hasSanityEnv) {
    return getLocalCategories().map((category) => ({
      ...category,
      sections: [],
    }));
  }

  const {data} = await sanityFetch<SanityCategory[]>({
    query: allCategoriesQuery,
    tags: ['category'],
    revalidate: 60,
  });

  if (!data.length) {
    return getLocalCategories().map((category) => ({
      ...category,
      sections: [],
    }));
  }

  return data.map(mapCategory);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CmsCategory | undefined> {
  if (!hasSanityEnv) {
    const fallback = getLocalCategories().find((item) => item.slug === slug);
    return fallback
      ? {
          ...fallback,
          sections: [],
        }
      : undefined;
  }

  const {data} = await sanityFetch<SanityCategory | null>({
    query: categoryBySlugQuery,
    params: {slug},
    tags: ['category', 'post', 'author'],
    revalidate: 60,
  });

  if (!data) {
    const fallback = getLocalCategories().find((item) => item.slug === slug);
    return fallback
      ? {
          ...fallback,
          sections: [],
        }
      : undefined;
  }

  return mapCategory(data);
}

export async function getCategoryListing(
  slug: string,
  page = 1,
  pageSize = 9,
): Promise<CategoryListingResult> {
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      category: undefined,
      posts: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
    };
  }

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  if (!hasSanityEnv) {
    const items = getLocalAllPosts()
      .map(mapLocalPost)
      .filter((post) => post.categorySlug === slug);

    return {
      category,
      posts: items.slice(start, end),
      total: items.length,
      page: currentPage,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
    };
  }

  const [{data: posts}, {data: total}] = await Promise.all([
    sanityFetch<SanityPost[]>({
      query: postsByCategoryPageQuery,
      params: {category: slug, start, end},
      tags: ['post', 'category', 'author'],
      revalidate: 60,
    }),
    sanityFetch<number>({
      query: postsByCategoryCountQuery,
      params: {category: slug},
      tags: ['post', 'category'],
      revalidate: 60,
    }),
  ]);

  return {
    category,
    posts: posts.map(mapPost),
    total,
    page: currentPage,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getAllAuthors(): Promise<CmsAuthor[]> {
  if (!hasSanityEnv) {
    return [fallbackAuthor];
  }

  const {data} = await sanityFetch<SanityAuthor[]>({
    query: allAuthorsQuery,
    tags: ['author'],
    revalidate: 60,
  });

  if (!data.length) {
    return [fallbackAuthor];
  }

  return data
    .map(mapAuthor)
    .filter((author): author is CmsAuthor => Boolean(author));
}

export async function getAuthorBySlug(
  slug: string,
): Promise<CmsAuthor | undefined> {
  if (!hasSanityEnv) {
    return slug === fallbackAuthor.slug ? fallbackAuthor : undefined;
  }

  const {data} = await sanityFetch<SanityAuthor | null>({
    query: authorBySlugQuery,
    params: {slug},
    tags: ['author'],
    revalidate: 60,
  });

  if (!data) {
    return slug === fallbackAuthor.slug ? fallbackAuthor : undefined;
  }

  return mapAuthor(data);
}

export async function getAllPosts(): Promise<CmsArticlePost[]> {
  if (!hasSanityEnv) {
    return getLocalAllPosts().map(mapLocalPost);
  }

  const {data} = await sanityFetch<SanityPost[]>({
    query: allPostsQuery,
    tags: ['post', 'category', 'author'],
    revalidate: 60,
  });

  if (!data.length) {
    return getLocalAllPosts().map(mapLocalPost);
  }

  return data.map(mapPost);
}

export async function getPostsByAuthor(
  slug: string,
): Promise<CmsArticlePost[]> {
  if (!hasSanityEnv) {
    return slug === fallbackAuthor.slug
      ? getLocalAllPosts().map(mapLocalPost)
      : [];
  }

  const {data} = await sanityFetch<SanityPost[]>({
    query: postsByAuthorQuery,
    params: {slug},
    tags: ['post', 'author', 'category'],
    revalidate: 60,
  });

  if (!data.length) {
    return slug === fallbackAuthor.slug
      ? getLocalAllPosts().map(mapLocalPost)
      : [];
  }

  return data.map(mapPost);
}

export async function getSearchPage(
  term: string,
  page = 1,
  pageSize = 10,
): Promise<SearchPageResult> {
  const normalized = term.trim();

  if (!normalized) {
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
    };
  }

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  if (!hasSanityEnv) {
    const items = getLocalAllPosts()
      .map(mapLocalPost)
      .filter((post) =>
        [post.title, post.excerpt, post.pillar, ...(post.tags ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(normalized.toLowerCase()),
      );

    return {
      items: items.slice(start, end),
      total: items.length,
      page: currentPage,
      pageSize,
      totalPages: Math.ceil(items.length / pageSize),
    };
  }

  const [{data: items}, {data: total}] = await Promise.all([
    sanityFetch<SanityPost[]>({
      query: searchPostsPageQuery,
      params: {term: normalized, start, end},
      tags: ['post', 'category', 'author'],
      revalidate: 60,
    }),
    sanityFetch<number>({
      query: searchPostsCountQuery,
      params: {term: normalized},
      tags: ['post'],
      revalidate: 60,
    }),
  ]);

  return {
    items: items.map(mapPost),
    total,
    page: currentPage,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getPostByCategoryAndSlug(
  categorySlug: string,
  slug: string,
): Promise<CmsArticlePost | undefined> {
  if (!hasSanityEnv) {
    const fallback = getLocalPostByCategoryAndSlug(categorySlug, slug);
    return fallback ? mapLocalPost(fallback) : undefined;
  }

  const {data} = await sanityFetch<SanityPost | null>({
    query: postByCategoryAndSlugQuery,
    params: {
      category: categorySlug,
      slug,
    },
    tags: ['post', 'category', 'author'],
    revalidate: 60,
  });

  if (!data) {
    const fallback = getLocalPostByCategoryAndSlug(categorySlug, slug);
    return fallback ? mapLocalPost(fallback) : undefined;
  }

  return mapPost(data);
}

export async function getRelatedPosts(
  post: CmsArticlePost,
  limit = 3,
): Promise<CmsArticlePost[]> {
  if (!hasSanityEnv) {
    return getLocalRelatedPosts(post, limit).map(mapLocalPost);
  }

  const {data} = await sanityFetch<SanityPost[]>({
    query: relatedPostsQuery,
    params: {
      category: post.categorySlug,
      slug: post.slug,
      limit,
    },
    tags: ['post', 'category', 'author'],
    revalidate: 60,
  });

  if (!data.length) {
    return getLocalRelatedPosts(post, limit).map(mapLocalPost);
  }

  return data.map(mapPost);
}

export async function getLegalPageBySlug(slug: string): Promise<CmsLegalPage> {
  const fallback = staticPages[slug];

  if (!hasSanityEnv) {
    return {
      ...(fallback ?? {
        eyebrow: 'Institucional',
        title: 'Página institucional',
        description: '',
        sections: [],
      }),
      body: [],
      sections: [],
    };
  }

  const {data} = await sanityFetch<SanityLegalPage | null>({
    query: legalPageBySlugQuery,
    params: {slug},
    tags: ['legalPage'],
    revalidate: 60,
  });

  if (!data) {
    return {
      ...(fallback ?? {
        eyebrow: 'Institucional',
        title: 'Página institucional',
        description: '',
        sections: [],
      }),
      body: [],
      sections: [],
    };
  }

  return {
    eyebrow: data.eyebrow ?? fallback?.eyebrow ?? 'Institucional',
    title: data.title ?? fallback?.title ?? 'Página institucional',
    description: data.description ?? fallback?.description ?? '',
    sections: mapModularSections(data.sections),
    body: [],
    seoTitle: data.seo?.title,
    seoDescription: data.seo?.description,
    seoImage: data.seo?.image,
  };
}

export function formatDate(date: string) {
  return formatLocalDate(date);
}
