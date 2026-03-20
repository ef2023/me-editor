import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ArticleShell} from '@/components/article/article-shell';
import {
  getAllPosts,
  getCategoryBySlug,
  getPostByCategoryAndSlug,
  getRelatedPosts,
} from '@/lib/content-source';
import {buildMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {category: categorySlug, slug} = await params;
  const post = await getPostByCategoryAndSlug(categorySlug, slug);

  if (!post) {
    return buildMetadata({
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não foi encontrado.',
      path: `/${categorySlug}/${slug}`,
      noIndex: true,
      type: 'article',
    });
  }

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/${post.categorySlug}/${post.slug}`,
    type: 'article',
  });
}

export default async function ArticlePage({params}: PageProps) {
  const {category: categorySlug, slug} = await params;
  const category = await getCategoryBySlug(categorySlug);
  const post = await getPostByCategoryAndSlug(categorySlug, slug);

  if (!category || !post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return <ArticleShell category={category} post={post} relatedPosts={relatedPosts} />;
}