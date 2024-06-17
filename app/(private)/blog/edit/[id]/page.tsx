import { PostForm } from '@/components/features/post/PostForm';
import { title } from '@/components/primitives';
import { getMetadata } from '@/lib/getMetadata';
import { createServerClient } from '@/lib/supabase/server';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<{ id: string }>) {
  const supabase = await createServerClient();
  const { id } = params;

  if (!id || isNaN(parseInt(id))) {
    return <h1>Invalid ID</h1>;
  }

  const { data: post } = await supabase.from('posts').select().eq('id', id).single();

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <h1 className={title()}>Update the post</h1>
      <PostForm id={post.id} initialValues={post} />
    </>
  );
}
