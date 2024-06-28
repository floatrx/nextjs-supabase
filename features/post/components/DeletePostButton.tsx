'use client';

import type { TPostId } from '@/types/post';

import { Button, type ButtonProps } from '@nextui-org/button';
import { Trash } from 'lucide-react';

import { deletePost } from '@/features/post/actions/deletePost';
import { useServerAction } from '@/hooks/useServerAction';

interface IProps extends Omit<ButtonProps, 'id'> {
  title?: string;
  id: TPostId;
}

export const DeletePostButton: RC<IProps> = ({ id, title, ...props }) => {
  const { loading, execute } = useServerAction(deletePost);

  return (
    <Button isIconOnly={!title} isLoading={loading} variant="ghost" onClick={() => execute(id)} {...props}>
      <Trash size="1.8cap" />
      {title}
    </Button>
  );
};
