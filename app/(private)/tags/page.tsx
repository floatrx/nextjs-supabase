import { Page } from '@/components/ui/layout/Page';
import { AddTagForm } from '@/features/tag/components/AddTagForm';
import { DeleteTagButton } from '@/features/tag/components/DeleteTagButton';
import { TagItem } from '@/features/tag/components/TagItem';
import { tagService } from '@/features/tag/services/tag';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Tags');

export default async function TagsSinglePage() {
  const { data: tags } = await tagService.search();

  return (
    <Page count={tags?.length} meta={metadata}>
      <div className="container mt-5 h-full space-y-4">
        <AddTagForm />
        <div className="stack flex-wrap">
          {tags?.map((tag) => <TagItem key={tag.id} actions={<DeleteTagButton id={tag.id} />} tag={tag} />)}
        </div>
      </div>
    </Page>
  );
}
