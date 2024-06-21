import { CreatePostForm } from '@/components/features/post/CreatePostForm';
import { Heading } from '@/components/ui/layout/headings/Heading';
import { Page } from '@/components/ui/layout/Page';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Create new Post');

export default async function CreatePostPage() {
  return (
    <Page meta={metadata}>
      <Heading />
      <CreatePostForm />
    </Page>
  );
}
