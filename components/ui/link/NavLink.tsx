import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils/cn';
import { link as linkStyles, type LinkVariantProps } from '@heroui/theme';

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
