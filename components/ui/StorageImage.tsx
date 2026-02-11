'use client';

import { motion } from 'motion/react';

import { Image, ImageProps } from '@/lib/heroui';
import { getImageUrl } from '@/lib/supabase/storage';
import { cn } from '@/lib/utils/cn';

interface IProps extends Omit<ImageProps, 'src'> {
  src?: string | null; // src can be null (supabase)
  layoutId?: string; // for shared element transitions
  onClick?: () => void; // click handler
  testId?: string; // test id for e2e tests
}

/**
 * StorageImage component to display images from the supabase storage
 * @param src - image path or full URL
 * @param layoutId - unique ID for shared element transitions
 * @param className - additional class names
 * @param onClick - click handler
 * @param testId - test id for e2e tests
 * @param props - other compatible ImageProps
 */
export const StorageImage: RC<IProps> = ({ src, layoutId, className, onClick, testId, ...props }) => {
  if (!src) return null;

  const image = (
    <Image
      alt="thumbnail"
      className={cn('min-w-full rounded-2xl shadow-2xl', className)}
      loading="lazy"
      src={getImageUrl(src)}
      {...props}
    />
  );

  if (layoutId) {
    return (
      <motion.div
        data-testid={testId}
        layoutId={layoutId}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={onClick}
      >
        {image}
      </motion.div>
    );
  }

  if (onClick) {
    return (
      <div data-testid={testId} onClick={onClick}>
        {image}
      </div>
    );
  }

  return image;
};
