import type {Metadata} from 'next';
import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';
import {PostListShell} from '@/components/post/post-list-shell';
import {getAllPosts} from '@/lib/content-source';

export const metadata: Metadata = {
  title: 'Posts | Mistério do Evangelho',
  description:
    'Veja todos os posts publicados no portal Mistério do Evangelho em uma listagem editorial completa.',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <SiteHeader />
      <main>
        <PostListShell posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}