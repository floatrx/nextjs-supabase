'use client';

import type { ButtonProps } from '@/lib/heroui';

import { X } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { removePostTag } from '@/features/post/actions/removePostTag';
import { Button } from '@/lib/heroui';
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
      onPress={async () => {
        await execute({ postId, tagId });
      }}
      {...props}
    >
      <X size="1.8cap" />
    </Button>
  );
};
