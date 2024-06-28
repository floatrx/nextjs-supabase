import type { TPostId } from '@/types/post';

import { type ButtonProps, Button } from '@nextui-org/button';
import { PenBox } from 'lucide-react';
import Link from 'next/link';

interface IProps extends Omit<ButtonProps, 'id'> {
  title?: string;
  id: TPostId;
}

export const EditPostButton: RC<IProps> = ({ id, title, ...props }) => (
  <Button as={Link} className="stack" href={`/blog/edit/${id}`} isIconOnly={!title} variant="ghost" {...props}>
    <PenBox size="1.8cap" />
    {title}
  </Button>
);
