import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { PostsCards } from '@/components/features/post/PostsCards';
import { title } from '@/components/primitives';
import { getMetadata } from '@/lib/next';
import { postService } from '@/server/services/post';

export const metadata = getMetadata('Home');

export default async function HomePage() {
  const posts = await postService.search();

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <h1 className="stack">
        <span className={title()}>Latest posts</span>
        <Button isIconOnly as={Link} href="/blog/create" variant="ghost">
          <Plus />
        </Button>
        Count: {posts.count}
      </h1>
      <PostsCards posts={posts.data} />
    </section>
  );
}
