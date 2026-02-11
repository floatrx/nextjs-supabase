'use client';

import type { TTag } from '@/types/tag';

import { Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { deleteTag } from '@/features/tag/actions/deleteTag';
import { Button } from '@/lib/heroui';

export const DeleteTagButton = ({ id }: Pick<TTag, 'id'>) => {
  const { isPending, execute } = useServerAction(deleteTag);

  return (
    <Button isIconOnly isLoading={isPending} size="sm" variant="ghost" onPress={() => execute({ id })}>
      <Trash2 size={15} />
    </Button>
  );
};
