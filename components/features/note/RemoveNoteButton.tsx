'use client';

import { Button } from '@nextui-org/button';
import { Trash2 } from 'lucide-react';

import { useApi } from '@/hooks/useApi';

export const RemoveNoteButton = (props: { id: number }) => {
  const [remove, isLoading] = useApi<number>('DELETE', 'notes');

  return (
    <Button isIconOnly isLoading={isLoading} size="sm" variant="ghost" onClick={() => remove(props.id)}>
      <Trash2 size={15} />
    </Button>
  );
};
