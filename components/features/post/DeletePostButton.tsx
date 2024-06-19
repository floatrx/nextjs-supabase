'use client';

import type { TPostId } from '@/types/post';

import { Button } from '@nextui-org/button';
import { Trash } from 'lucide-react';

import { useApi } from '@/hooks/useApi';

export const DeletePostButton = ({ id }: TPostId) => {
  const [deletePost, pending] = useApi<TPostId>('delete', 'posts');

  return (
    <Button isIconOnly className="hover:text-red-500" isLoading={pending} size="sm" variant="ghost" onClick={() => deletePost({ id })}>
      <Trash size={16} />
    </Button>
  );
};