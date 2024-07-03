'use client';

import type { TTag } from '@/types/tag';

import { Button } from '@nextui-org/button';
import { Trash2 } from 'lucide-react';

import { deleteTag } from '@/features/tag/actions/deleteTag';
import { useServerAction_deprecated } from '@/hooks/useServerAction_deprecated';

export const DeleteTagButton = (props: Pick<TTag, 'id'>) => {
  const { loading, execute } = useServerAction_deprecated(deleteTag);

  return (
    <Button isIconOnly isLoading={loading} size="sm" variant="ghost" onClick={() => execute(props.id)}>
      <Trash2 size={15} />
    </Button>
  );
};
