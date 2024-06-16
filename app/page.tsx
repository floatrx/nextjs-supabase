import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Plus } from 'lucide-react';

import { PostsCards } from '@/app/PostsCards';
import { title } from '@/components/primitives';
import { getMetadata } from '@/lib/metadata';
import { postService } from '@/lib/supabase/services/post';

export const metadata = getMetadata('Home');

export default async function HomePage() {
  const posts = await postService.searchPosts();

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <h1 className="stack">
        <span className={title()}>Latest posts</span>
        <Link href="/blog/create">
          <Button isIconOnly variant="ghost">
            <Plus />
          </Button>
        </Link>
      </h1>
      <PostsCards posts={posts.data} />
    </section>
  );
}
