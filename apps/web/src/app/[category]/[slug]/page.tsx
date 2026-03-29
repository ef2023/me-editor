import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArticleShell} from '@/components/article/article-shell';
import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';
import {
  getCategoryBySlug,
  getPostByCategoryAndSlug,
  getRelatedPosts,
} from '@/lib/content-source';

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

function resolveAbsoluteImageUrl(url?: string) {
  if (!url) {
    return undefined;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return new URL(url, base).toString();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {category, slug} = await params;

  const post = await getPostByCategoryAndSlug(category, slug);

  if (!post) {
    return {
      title: 'Conteúdo não encontrado | Mistério do Evangelho',
      description: 'O conteúdo solicitado não foi encontrado.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const path = `/${post.categorySlug}/${post.slug}`;
  const canonicalUrl = new URL(path, siteUrl).toString();

  const shareImage =
    resolveAbsoluteImageUrl(post.seoImage?.asset?.url) ??
    resolveAbsoluteImageUrl(post.coverImage?.asset?.url);

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: canonicalUrl,
      siteName: 'Mistério do Evangelho',
      type: 'article',
      locale: 'pt_BR',
      images: shareImage
        ? [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default async function ArticlePage({params}: PageProps) {
  const {category: categorySlug, slug} = await params;

  const [category, post] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPostByCategoryAndSlug(categorySlug, slug),
  ]);

  if (!category || !post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <ArticleShell
          category={category}
          post={post}
          relatedPosts={relatedPosts}
        />
      </main>
      <SiteFooter />
    </>
  );
}