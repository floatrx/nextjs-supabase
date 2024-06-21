import type { PostSearchParams } from '@/types/post';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { PostsCards } from '@/components/features/post/PostsCards';
import { PostSearchFilters } from '@/components/features/post/PostSearchFilters';
import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { Heading } from '@/components/ui/layout/headings/Heading';
import { PagePagination } from '@/components/ui/PagePagination';
import { getMetadata } from '@/lib/next';
import { postService } from '@/server/services/post';

export const metadata = getMetadata('Home');

export default async function HomePage({ searchParams }: PageProps<EmptyObj, PostSearchParams>) {
  const filters = {
    page: Number(searchParams.page) || 1,
    title: searchParams.title ?? '',
  } satisfies PostSearchParams;

  const posts = await postService.search(filters);

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <Heading className="stack">
        <span>Latest posts</span>
        <Chip>{posts.count ?? 0}</Chip>
        <OnlyAuth>
          <Button isIconOnly as={Link} href="/blog/create" variant="ghost">
            <Plus />
          </Button>
        </OnlyAuth>
      </Heading>
      <PostSearchFilters />
      <PostsCards posts={posts.data} />
      {!!posts.count && <PagePagination total={posts.total} />}
    </section>
  );
}
