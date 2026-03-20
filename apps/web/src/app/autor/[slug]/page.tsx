import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {AuthorShell} from '@/components/author/author-shell';
import {
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor,
} from '@/lib/content-source';
import {buildMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const authors = await getAllAuthors();

  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return buildMetadata({
      title: 'Autor não encontrado',
      description: 'O autor solicitado não foi encontrado.',
      path: `/autor/${slug}`,
      noIndex: true,
      type: 'profile',
    });
  }

  return buildMetadata({
    title: author.name,
    description:
      author.shortBio ??
      `Perfil editorial de ${author.name} no Mistério do Evangelho.`,
    path: `/autor/${author.slug}`,
    type: 'profile',
  });
}

export default async function AuthorPage({params}: PageProps) {
  const {slug} = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.slug);

  return <AuthorShell author={author} posts={posts} />;
}