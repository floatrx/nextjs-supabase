'use client';

import type { ButtonProps } from '@/lib/heroui';
import type { TPostId } from '@/types/post';

import { Trash } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { deletePost } from '@/features/post/actions/deletePost';
import { Button } from '@/lib/heroui';

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
