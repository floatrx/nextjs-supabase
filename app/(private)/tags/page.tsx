import type { RoleId } from '@/lib/rbac/permissions';

import { Page } from '@/components/ui/layout/Page';
import { searchTags } from '@/features/tag/actions/searchTags';
import { AddTagForm } from '@/features/tag/components/AddTagForm';
import { DeleteTagButton } from '@/features/tag/components/DeleteTagButton';
import { TagItem } from '@/features/tag/components/TagItem';
import { getMetadata } from '@/lib/next/metadata';
import { isModerator } from '@/lib/rbac/permissions';
import { createServerClient } from '@/lib/supabase/server';

export const metadata = getMetadata('Tags');

export default async function TagsSinglePage() {
  const [tags, error] = await searchTags();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get user role
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userRole: RoleId | undefined;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('id_role').eq('id', user.id).single();
    userRole = profile?.id_role as RoleId;
  }

  const canManageTags = isModerator(userRole);

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
