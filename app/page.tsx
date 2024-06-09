import type { TPostWithAuthor } from '@/types/post';

import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';

import { title } from '@/components/primitives';
import { createClient } from '@/lib/supabase/server';
import { PostCard } from '@/components/features/post/PostCard';

const getPosts = async (): Promise<TPostWithAuthor[]> => {
  const supabase = await createClient();

  const { error, data } = await supabase
    // Select all posts fields from the posts table & join the author's profile with the role
    .from('posts')
    .select('*, author: profiles (*, role: roles (*))')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);

    return [];
  }

  return data;
};

export default async function HomePage() {
  const posts = await getPosts();

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
