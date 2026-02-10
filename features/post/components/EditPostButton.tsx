import type { TPostId } from '@/types/post';

import { LinkComponent } from '@/components/ui/link/LinkComponent';
import { type ButtonProps, Button } from '@heroui/button';
import { PenBox } from 'lucide-react';

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
