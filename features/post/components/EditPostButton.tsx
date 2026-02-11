import type { ButtonProps } from '@/lib/heroui';
import type { TPostId } from '@/types/post';

import { PenBox } from 'lucide-react';

import { LinkComponent } from '@/components/ui/link/LinkComponent';
import { Button } from '@/lib/heroui';

interface IProps extends Omit<ButtonProps, 'id'> {
  title?: string;
  id: TPostId;
}

export const EditPostButton: RC<IProps> = ({ id, title, ...props }) => (
  <Button as={LinkComponent} className="stack" href={`/blog/edit/${id}`} isIconOnly={!title} variant="ghost" {...props}>
    <PenBox size="1.8cap" />
    {title}
  </Button>
);
