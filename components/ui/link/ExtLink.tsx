import { Link, LinkProps } from '@/lib/heroui';

export type ExtLinkProps = LinkProps;

export const ExtLink: FC<ExtLinkProps> = ({ children, ...linkProps }) => (
  <Link isExternal {...linkProps}>
    {children}
  </Link>
);
