import type { TPost } from '@/types/post';

import { Page } from '@/components/ui/layout/Page';
import { EditPostForm } from '@/features/post/components/EditPostForm';
import { postService } from '@/features/post/services/post';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<Pick<TPost, 'id'>>) {
  const { id } = params;

  if (!id) {
    return <p>Post id is required!</p>;
  }

  // Query post by id
  const { data: post } = await postService.getById(id);

  return <Page meta={metadata}>{post ? <EditPostForm id={id} initialValues={post} /> : <p>Post ${id} not found!</p>}</Page>;
}
