import type { ButtonProps } from '@/lib/heroui';

import { Plus } from 'lucide-react';

import { OnlyAuth } from '@/components/guards/OnlyAuth';
import { LinkComponent } from '@/components/ui/link/LinkComponent';
import { Button } from '@/lib/heroui';

interface IProps extends Omit<ButtonProps, 'as' | 'href'> {}

export const PostCreateButton: RC<IProps> = (props) => (
  <OnlyAuth>
    <Button isIconOnly as={LinkComponent} color="primary" href="/blog/create" size="sm" variant="shadow" {...props}>
      <Plus />
    </Button>
  </OnlyAuth>
);
