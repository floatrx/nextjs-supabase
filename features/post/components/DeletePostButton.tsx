'use client';

import type { TPostId } from '@/types/post';

import { Button } from '@nextui-org/button';
import { Trash } from 'lucide-react';

import { deletePost } from '@/features/post/actions/deletePost';
import { useServerAction } from '@/hooks/useServerAction';

export const DeletePostButton = ({ id }: TPostId) => {
  const { loading, execute } = useServerAction(deletePost);

  return (
    <Button isIconOnly className="hover:text-red-500" isLoading={loading} size="sm" variant="ghost" onClick={() => execute(id)}>
      <Trash size={16} />
    </Button>
  );
};
