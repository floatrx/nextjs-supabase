import { Page } from '@/components/ui/layout/Page';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { PagePagination } from '@/components/ui/PagePagination';
import { searchPosts } from '@/features/post/actions/searchPosts';
import { type PostSearchParams, PostSearchSchema } from '@/features/post/actions/validators/postSearchSchema';
import { PostCreateButton } from '@/features/post/components/PostCreateButton';
import { PostsCards } from '@/features/post/components/PostsCards';
import { PostSearchFilters } from '@/features/post/components/PostSearchFilters';
import { getMetadata } from '@/lib/next/metadata';
import { createServerClient } from '@/lib/supabase/server';

export const metadata = getMetadata('Homepage');

export default async function HomePage(props: PageProps<EmptyObj, PostSearchParams>) {
  const searchParams = await props.searchParams;
  const filters = PostSearchSchema.parse(searchParams);

  // Fetch posts (public)
  const [posts, error] = await searchPosts(filters);

  if (error) {
    return <p>{error?.message}</p>;
  }

  // Get current user for edit/delete permissions (optional, no error if not logged in)
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Page actions={<PostCreateButton />} className="space-y-4" count={posts.count} title="Latest posts">
      <PostSearchFilters />
      <PostsCards currentUserId={user?.id} posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
      <LoadMoreButton defaultLimit={filters.limit} max={posts.total} />
    </Page>
  );
}
