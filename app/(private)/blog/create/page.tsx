import { Heading } from '@/components/ui/layout/headings/Heading';
import { Page } from '@/components/ui/layout/Page';
import { CreatePostForm } from '@/features/post/components/CreatePostForm';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Create new');

export default async function CreatePostPage() {
  return (
    <Page meta={metadata}>
      <Heading />
      <CreatePostForm />
    </Page>
  );
}
