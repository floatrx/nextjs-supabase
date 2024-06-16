import { PostForm } from '@/components/features/post/PostForm';
import { title } from '@/components/primitives';
import { getMetadata } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';

export const metadata = getMetadata('Edit post');

export default async function CreateArticle({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = params;
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
