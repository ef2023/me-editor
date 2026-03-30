import type {MetadataRoute} from 'next';
import {
  getAllAuthors,
  getAllEsbocos,
  getAllPosts,
  getCategories,
} from '@/lib/content-source';
import {siteConfig} from '@/lib/site';

const legalPaths = [
  '/sobre',
  '/contato',
  '/politica-de-privacidade',
  '/politica-de-cookies',
  '/termos-de-uso',
  '/aviso-editorial',
  '/esbocos',
  '/posts',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, posts, authors, esbocos] = await Promise.all([
    getCategories(),
    getAllPosts(),
    getAllAuthors(),
    getAllEsbocos(),
  ]);

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...legalPaths.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority:
        path === '/esbocos' || path === '/posts'
          ? 0.7
          : 0.5,
    })),
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${siteConfig.url}/autor/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/${post.categorySlug}/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00`),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const esbocoEntries: MetadataRoute.Sitemap = esbocos.map((esboco) => ({
    url: `${siteConfig.url}/esbocos/${esboco.slug}`,
    lastModified: new Date(`${esboco.updatedAt}T00:00:00`),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...baseEntries,
    ...categoryEntries,
    ...authorEntries,
    ...postEntries,
    ...esbocoEntries,
  ];
}