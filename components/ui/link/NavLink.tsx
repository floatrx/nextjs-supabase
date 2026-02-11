'use client';

import type { LinkVariantProps } from '@/lib/heroui';

import Link, { LinkProps } from 'next/link';

import { link as linkStyles } from '@/lib/heroui';
import { cn } from '@/lib/utils/cn';

interface IProps extends LinkProps {
  className?: string;
  color?: LinkVariantProps['color'];
  variant?: LinkVariantProps;
}

export const NavLink: FC<IProps> = ({ children, variant, color = 'foreground', ...linkProps }) => (
  <Link
    className={cn(linkStyles({ ...variant, color }), 'data-[active=true]:text-primary data-[active=true]:font-medium')}
    {...linkProps}
  >
    {children}
  </Link>
);
