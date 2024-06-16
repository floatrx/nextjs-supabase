import { Link } from '@nextui-org/link';

import { title } from '@/components/primitives';
import { createClient } from '@/lib/supabase/server';

export default async function PostSinglePage({ params }: any) {
  const { slug } = params;
  const supabase = await createClient();
  const { error, data: post } = await supabase.from('posts').select().eq('slug', slug).single();

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1 className={title()}>Edit single Article</h1>
      <p>{JSON.stringify(post)}</p>
      <Link href={`/blog/${post.slug}/update`}>Edit</Link>
    </div>
  );
}
