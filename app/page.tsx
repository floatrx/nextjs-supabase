import type { PostSearchParams } from '@/types/post';

import { Page } from '@/components/ui/layout/Page';
import { PagePagination } from '@/components/ui/PagePagination';
import { PostCreateButton } from '@/features/post/components/PostCreateButton';
import { PostsCards } from '@/features/post/components/PostsCards';
import { PostSearchFilters } from '@/features/post/components/PostSearchFilters';
import { postService } from '@/features/post/services/post';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Homepage');

export default async function HomePage({ searchParams }: PageProps<EmptyObj, PostSearchParams>) {
  const filters = {
    page: Number(searchParams.page) || 1,
    title: searchParams.title ?? '',
  } satisfies PostSearchParams;

  const posts = await postService.search(filters);

  return (
    <Page actions={<PostCreateButton />} className="space-y-4" count={posts.count} title="Latest posts">
      <PostSearchFilters />
      <PostsCards posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
    </Page>
  );
}
