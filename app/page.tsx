import type { RoleId } from '@/lib/rbac/permissions';

import { Page } from '@/components/ui/layout/Page';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { PagePagination } from '@/components/ui/PagePagination';
import { searchPosts } from '@/features/post/actions/searchPosts';
import { PostSearchSchema } from '@/features/post/actions/validators/postSearchSchema';
import { PostCreateButton } from '@/features/post/components/PostCreateButton';
import { PostsCards } from '@/features/post/components/PostsCards';
import { PostSearchFilters } from '@/features/post/components/PostSearchFilters';
import { getMetadata } from '@/lib/next/metadata';
import { isModerator } from '@/lib/rbac/permissions';
import { createServerClient } from '@/lib/supabase/server';

export const metadata = getMetadata('Homepage');

export default async function HomePage(props: PageProps<'/'>) {
  const searchParams = await props.searchParams;
  const filters = PostSearchSchema.parse(searchParams);

  // Fetch posts (public)
  const [posts, error] = await searchPosts(filters);

  if (error) {
    return <p>{error?.message}</p>;
  }

  // Get current user and role for permissions
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userRole: RoleId | undefined;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('id_role').eq('id', user.id).single();
    userRole = profile?.id_role as RoleId;
  }

  return (
    <Page
      actions={isModerator(userRole) && <PostCreateButton />}
      className="space-y-4"
      count={posts.count}
      title="Latest posts"
    >
      <PostSearchFilters />
      <PostsCards currentUserId={user?.id} posts={posts.data} userRole={userRole} />
      {!!posts.count && <PagePagination total={posts.total} />}
      <LoadMoreButton defaultLimit={filters.limit} max={posts.total} />
    </Page>
  );
}
