import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {CategoryShell} from '@/components/category/category-shell';
import {buildMetadata} from '@/lib/seo';
import {getCategoryListing} from '@/lib/content-source';

type PageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {category: slug} = await params;
  const listing = await getCategoryListing(slug, 1, 9);
  const category = listing.category;

  if (!category) {
    return buildMetadata({
      title: 'Categoria não encontrada',
      description: 'A categoria solicitada não foi encontrada.',
      path: `/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: category.seoTitle ?? category.title,
    description: category.seoDescription ?? category.description,
    path: `/${category.slug}`,
  });
}

export default async function CategoryPage({params, searchParams}: PageProps) {
  const {category} = await params;
  const {page = '1'} = await searchParams;
  const listing = await getCategoryListing(category, Number(page) || 1, 9);

  if (!listing.category) {
    notFound();
  }

  return <CategoryShell listing={listing} />;
}