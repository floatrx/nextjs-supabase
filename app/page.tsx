import type { PostSearchParams } from '@/types/post';

import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { PostsCards } from '@/components/features/post/PostsCards';
import { PostSearchFilters } from '@/components/features/post/PostSearchFilters';
import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { Page } from '@/components/ui/layout/Page';
import { PagePagination } from '@/components/ui/PagePagination';
import { getMetadata } from '@/lib/next';
import { postService } from '@/server/services/post';

export const metadata = getMetadata('Homepage');

export default async function HomePage({ searchParams }: PageProps<EmptyObj, PostSearchParams>) {
  const filters = {
    page: Number(searchParams.page) || 1,
    title: searchParams.title ?? '',
  } satisfies PostSearchParams;

  const posts = await postService.search(filters);

  return (
    <Page
      actions={
        <OnlyAuth>
          <Button isIconOnly as={Link} color="primary" href="/blog/create" variant="shadow">
            <Plus />
          </Button>
        </OnlyAuth>
      }
      className="space-y-4"
      count={posts.count}
      title="Latest posts"
    >
      <PostSearchFilters />
      <PostsCards posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
    </Page>
  );
}
