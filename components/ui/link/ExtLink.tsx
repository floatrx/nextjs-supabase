import { Link, LinkProps } from '@heroui/link';

export interface ExtLinkProps extends LinkProps {}

export const ExtLink: FC<ExtLinkProps> = ({ children, ...linkProps }) => (
  <Link isExternal {...linkProps}>
    {children}
  </Link>
);
