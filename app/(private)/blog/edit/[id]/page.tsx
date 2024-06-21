import { EditPostForm } from '@/components/features/post/EditPostForm';
import { Page } from '@/components/ui/layout/Page';
import { getMetadata } from '@/lib/next';
import { postService } from '@/server/services/post';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<{ id: string }>) {
  const { id } = params;

  // Query post by id
  const { data: post } = await postService.getById(id);

  return <Page meta={metadata}>{post ? <EditPostForm id={id} initialValues={post} /> : <p>Post ${id} not found!</p>}</Page>;
}
