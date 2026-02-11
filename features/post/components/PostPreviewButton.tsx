'use client';

import type { TPostExtended } from '@/types/post';

import { Eye } from 'lucide-react';

import { PostPreviewModal } from '@/features/post/components/PostPreviewModal';
import { Button, ButtonProps } from '@/lib/heroui';
import { useDisclosure } from '@/lib/heroui';

interface IProps extends Omit<ButtonProps, 'onPress'> {
  post: TPostExtended;
}

/**
 * Button that opens a fullscreen article preview modal
 */
export const PostPreviewButton: RC<IProps> = ({ post, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button isIconOnly title="Preview" onPress={onOpen} {...props}>
        <Eye size={16} />
      </Button>
      <PostPreviewModal isOpen={isOpen} post={post} onClose={onClose} />
    </>
  );
};
