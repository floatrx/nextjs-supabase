'use client';

import { Button, type ButtonProps } from '@nextui-org/button';
import { X } from 'lucide-react';

import { removePostTag } from '@/features/post/actions/removePostTag';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils/cn';

interface IProps extends ButtonProps {
  idPost: number;
  idTag: number;
}

export const RemovePostTag: RC<IProps> = ({ idPost, idTag, className, ...props }) => {
  const { loading, execute } = useServerAction(removePostTag);

  return (
    <Button
      isIconOnly
      className={cn('opacity-30 hover:opacity-100', className)}
      isLoading={loading}
      size="sm"
      variant="light"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        execute(idPost, idTag);
      }}
      {...props}
    >
      <X size="1.8cap" />
    </Button>
  );
};
