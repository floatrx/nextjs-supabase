'use client';

import type { TNote } from '@/types/note';

import { Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { deleteNote } from '@/features/note/actions/deleteNote';
import { Button } from '@/lib/heroui';

interface IProps extends Pick<TNote, 'id'> {
  testId?: string;
}

export const DeleteNoteButton = ({ id, testId }: IProps) => {
  const { isPending, execute } = useServerAction(deleteNote);

  return (
    <Button data-testid={testId} isIconOnly isLoading={isPending} size="sm" variant="ghost" onPress={() => execute(id)}>
      <Trash2 size={15} />
    </Button>
  );
};
