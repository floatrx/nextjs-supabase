import { EditPostForm } from '@/components/features/post/EditPostForm';
import { title } from '@/components/primitives';
import { getMetadata } from '@/lib/next';
import { postService } from '@/server/services/post';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<{ id: string }>) {
  const { id } = params;

  // Query post by id
  const { data: post, status, statusText } = await postService.getById(id);

  // Error | Post not found | Default
  const heading = status !== 200 ? statusText : !post ? 'Post not found' : 'Edit post';

  return (
    <>
      <h1 className={title()}>{heading}</h1>
      {post && <EditPostForm id={id} initialValues={post} />}
    </>
  );
}
