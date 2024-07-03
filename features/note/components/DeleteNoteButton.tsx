'use client';

import type { TNote } from '@/types/note';

import { Button } from '@nextui-org/button';
import { Trash2 } from 'lucide-react';

import { deleteNote } from '@/features/note/actions/deleteNote';
import { useServerAction_deprecated } from '@/hooks/useServerAction_deprecated';

export const DeleteNoteButton = (props: Pick<TNote, 'id'>) => {
  const { loading, execute } = useServerAction_deprecated(deleteNote);

  return (
    <Button isIconOnly isLoading={loading} size="sm" variant="ghost" onClick={() => execute(props.id)}>
      <Trash2 size={15} />
    </Button>
  );
};
