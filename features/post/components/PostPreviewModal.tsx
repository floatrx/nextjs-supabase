'use client';

import type { TPostExtended } from '@/types/post';

import { motion } from 'motion/react';
import Link from 'next/link';

import { PostArticle } from '@/features/post/components/PostArticle';
import { upperFirst } from '@/lib/utils/upperFirst';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';

interface IProps {
  post: TPostExtended;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Fullscreen article preview modal with motion animations
 */
export const PostPreviewModal: RC<IProps> = ({ post, isOpen, onClose }) => (
  <Modal
    backdrop="blur"
    classNames={{
      base: 'max-w-4xl max-h-[90vh]',
      body: 'overflow-y-auto py-6',
    }}
    data-testid="post-preview-modal"
    isOpen={isOpen}
    scrollBehavior="inside"
    size="5xl"
    onOpenChange={(open) => !open && onClose()}
  >
    <ModalContent>
      <ModalHeader className="flex justify-between gap-4">
        <span className="line-clamp-1">{upperFirst(post.title)}</span>
        <Button as={Link} href={`/blog/${post.slug}`} size="sm" variant="flat">
          Open full article
        </Button>
      </ModalHeader>
      <ModalBody>
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}>
          <PostArticle
            className="rounded-3xl border px-8 py-5"
            interactiveTags={false}
            layoutId={`post-thumbnail-${post.slug}`}
            post={post}
          />
        </motion.div>
      </ModalBody>
    </ModalContent>
  </Modal>
);
