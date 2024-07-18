'use client';

import type { TNote } from '@/types/note';

import { Button } from '@nextui-org/button';
import { Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { deleteNote } from '@/features/note/actions/deleteNote';

export const DeleteNoteButton = (props: Pick<TNote, 'id'>) => {
  const { isPending, execute } = useServerAction(deleteNote);

  return (
    <Button isIconOnly isLoading={isPending} size="sm" variant="ghost" onClick={() => execute(props.id)}>
      <Trash2 size={15} />
    </Button>
  );
};
