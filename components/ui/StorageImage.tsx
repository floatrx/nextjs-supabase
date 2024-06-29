import { Image, ImageProps } from '@nextui-org/image';

import { getImageUrl } from '@/lib/supabase/storage';
import { cn } from '@/lib/utils/cn';

interface IProps extends Omit<ImageProps, 'src'> {
  src?: string | null; // src can be null (supabase)
}

/**
 * StorageImage component to display images from the supabase storage
 * @param src - image path or full URL
 * @param className - additional class names
 * @param props - other compatible ImageProps
 */
export const StorageImage: RC<IProps> = ({ src, className, ...props }) => {
  if (!src) return null;

  return (
    <Image
      alt="thumbnail"
      className={cn('min-w-full rounded-2xl shadow-2xl', className)}
      loading="lazy"
      src={getImageUrl(src)}
      {...props}
    />
  );
};
