import { Link, LinkProps } from '@nextui-org/link';

export interface ExtLinkProps extends LinkProps {}

export const ExtLink: FC<ExtLinkProps> = ({ children, ...linkProps }) => (
  <Link isExternal {...linkProps}>
    {children}
  </Link>
);
