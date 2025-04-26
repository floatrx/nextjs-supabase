'use client';

import type { TPostId } from '@/types/post';

import { Button, type ButtonProps } from '@heroui/button';
import { Trash } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { deletePost } from '@/features/post/actions/deletePost';

interface IProps extends Omit<ButtonProps, 'id'> {
  title?: string;
  id: TPostId;
}

export const DeletePostButton: RC<IProps> = ({ id, title, ...props }) => {
  const { isPending, execute } = useServerAction(deletePost);

  return (
    <Button isIconOnly={!title} isLoading={isPending} variant="ghost" onPress={() => execute(id)} {...props}>
      <Trash size="1.8cap" />
      {title}
    </Button>
  );
};
