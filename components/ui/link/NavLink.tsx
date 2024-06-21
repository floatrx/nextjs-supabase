import { link as linkStyles, type LinkVariantProps } from '@nextui-org/theme';
import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

interface IProps extends LinkProps {
  className?: string;
  color?: LinkVariantProps['color'];
  variant?: LinkVariantProps;
  disableAnimation?: boolean;
}

export const NavLink: FC<IProps> = ({ children, disableAnimation, variant, color = 'foreground', ...linkProps }) => (
  <Link className={cn(linkStyles({ ...variant, color }), 'data-[active=true]:font-medium data-[active=true]:text-primary')} {...linkProps}>
    {children}
  </Link>
);
