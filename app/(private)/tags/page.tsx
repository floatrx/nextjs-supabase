import { Page } from '@/components/ui/layout/Page';
import { searchTags } from '@/features/tag/actions/searchTags';
import { AddTagForm } from '@/features/tag/components/AddTagForm';
import { DeleteTagButton } from '@/features/tag/components/DeleteTagButton';
import { TagItem } from '@/features/tag/components/TagItem';
import { getMetadata } from '@/lib/next/metadata';
import { isModerator } from '@/lib/rbac/permissions';
import { getUserWithRole } from '@/lib/supabase/getUserRole';

export const metadata = getMetadata('Tags');

export default async function TagsSinglePage() {
  const [tags, error] = await searchTags();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get user role
  const { role } = await getUserWithRole();
  const canManageTags = isModerator(role);

  return (
    <Page count={tags?.length} meta={metadata}>
      <div className="container mt-5 h-full space-y-4">
        {canManageTags && <AddTagForm />}
        <div className="stack flex-wrap">
          {tags?.map((tag) => (
            <TagItem key={tag.id} actions={canManageTags && <DeleteTagButton id={tag.id} />} tag={tag} />
          ))}
        </div>
      </div>
    </Page>
  );
}
