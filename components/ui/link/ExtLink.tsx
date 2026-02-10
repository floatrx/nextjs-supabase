import { Link, LinkProps } from '@heroui/link';

export type ExtLinkProps = LinkProps;

export const ExtLink: FC<ExtLinkProps> = ({ children, ...linkProps }) => (
  <Link isExternal {...linkProps}>
    {children}
  </Link>
);
