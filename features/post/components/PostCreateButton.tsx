import { Button, type ButtonProps } from '@nextui-org/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { OnlyAuth } from '@/components/guards/OnlyAuth';

interface IProps extends Omit<ButtonProps, 'as' | 'href'> {}

export const PostCreateButton: RC<IProps> = (props) => (
  <OnlyAuth>
    <Button isIconOnly as={Link} color="primary" href="/blog/create" size="sm" variant="shadow" {...props}>
      <Plus />
    </Button>
  </OnlyAuth>
);
