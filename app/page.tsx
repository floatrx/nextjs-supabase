import { Page } from '@/components/ui/layout/Page';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { PagePagination } from '@/components/ui/PagePagination';
import { searchPosts } from '@/features/post/actions/searchPosts';
import { PostSearchSchema, type PostSearchParams } from '@/features/post/actions/validators/postSearchSchema';
import { PostCreateButton } from '@/features/post/components/PostCreateButton';
import { PostsCards } from '@/features/post/components/PostsCards';
import { PostSearchFilters } from '@/features/post/components/PostSearchFilters';
import { getMetadata } from '@/lib/next/metadata';

export const metadata = getMetadata('Homepage');

export default async function HomePage({ searchParams }: PageProps<EmptyObj, PostSearchParams>) {
  const filters = PostSearchSchema.parse(searchParams);

  const [posts, error] = await searchPosts(filters);

  if (error) {
    return <p>{error?.message}</p>;
  }

  return (
    <Page actions={<PostCreateButton />} className="space-y-4" count={posts.count} title="Latest posts">
      <PostSearchFilters />
      <PostsCards posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
      <LoadMoreButton defaultLimit={filters.limit} max={posts.total} />
    </Page>
  );
}
