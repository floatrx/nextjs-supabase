import { link as linkStyles, type LinkVariantProps } from '@nextui-org/theme';
import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils/cn';

interface IProps extends LinkProps {
  className?: string;
  color?: LinkVariantProps['color'];
  variant?: LinkVariantProps;
}

export const NavLink: FC<IProps> = ({ children, variant, color = 'foreground', ...linkProps }) => (
  <Link
    className={cn(linkStyles({ ...variant, color }), 'data-[active=true]:font-medium data-[active=true]:text-primary')}
    {...linkProps}
  >
    {children}
  </Link>
);
