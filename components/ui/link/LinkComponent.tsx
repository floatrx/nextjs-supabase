'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

/**
 * Client-side Link component for use with HeroUI's `as` prop
 * Next.js 16 requires explicit client marking for components passed as props
 */
export const LinkComponent = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>((props, ref) => (
  <Link ref={ref} {...props} />
));

LinkComponent.displayName = 'LinkComponent';
