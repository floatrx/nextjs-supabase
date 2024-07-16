import type { TPost } from '@/types/post';

import { Page } from '@/components/ui/layout/Page';
import { getPostById } from '@/features/post/actions/getPost';
import { EditPostForm } from '@/features/post/components/EditPostForm';
import { getMetadata } from '@/lib/next/metadata';

export const metadata = getMetadata('Edit post');

export default async function EditPost({ params }: PageProps<Pick<TPost, 'id'>>) {
  const { id } = params;

  // Query post by id
  const [post, error] = await getPostById(id);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Page meta={metadata}>{post ? <EditPostForm id={id!} initialValues={post} /> : <p>Post ${id} not found!</p>}</Page>
  );
}
