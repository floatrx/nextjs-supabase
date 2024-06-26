import { Page } from '@/components/ui/layout/Page';
import { EditPostForm } from '@/features/post/components/EditPostForm';
import { postService } from '@/features/post/services/post';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<{ id: string }>) {
  const { id } = params;

  // Query post by id
  const { data: post } = await postService.getById(id);

  return <Page meta={metadata}>{post ? <EditPostForm id={id} initialValues={post} /> : <p>Post ${id} not found!</p>}</Page>;
}
