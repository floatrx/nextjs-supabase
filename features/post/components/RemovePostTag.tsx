'use client';

import { Button, type ButtonProps } from '@nextui-org/button';
import { X } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { removePostTag } from '@/features/post/actions/removePostTag';
import { cn } from '@/lib/utils/cn';

interface IProps extends ButtonProps {
  postId: number;
  tagId: number;
}

export const RemovePostTag: RC<IProps> = ({ postId, tagId, className, ...props }) => {
  const { isPending, execute } = useServerAction(removePostTag);

  return (
    <Button
      isIconOnly
      className={cn('opacity-30 hover:opacity-100', className)}
      isLoading={isPending}
      size="sm"
      variant="light"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        execute({ postId, tagId });
      }}
      {...props}
    >
      <X size="1.8cap" />
    </Button>
  );
};
