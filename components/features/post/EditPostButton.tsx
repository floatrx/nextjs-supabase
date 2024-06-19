import { type ButtonProps, Button } from '@nextui-org/button';
import { PenBox } from 'lucide-react';
import Link from 'next/link';

interface IProps extends Omit<ButtonProps, 'id'> {
  id: string | number; // id is required & could be string or number
}

export const EditPostButton: RC<IProps> = ({ id }) => (
  <Button isIconOnly as={Link} href={`/blog/edit/${id}`} size="sm" variant="ghost">
    <PenBox size={18} />
  </Button>
);
