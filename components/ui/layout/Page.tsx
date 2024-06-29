import type { Metadata } from 'next';

import { Chip } from '@nextui-org/chip';

import { Heading } from '@/components/ui/layout/headings/Heading';
import { getTitleFromNextMetadata } from '@/lib/next/metadata';
import { cn } from '@/lib/utils/cn';

interface IProps {
  className?: string;
  title?: string;
  // use metadata const for sync title
  meta?: Metadata;
  // slot for actions
  actions?: React.ReactNode;
  // slot for icon
  icon?: React.ReactNode;
  // slot for extra
  before?: React.ReactNode;
  count?: number | null;
}

export const Page: FC<IProps> = ({ className, meta, title, actions, icon, before, count, children }) => (
  <div className={cn(className)}>
    {before}
    <Heading className="stack">
      <div className="stack">
        {icon} {getTitleFromNextMetadata(meta, title)}
        {!!count && <Chip variant="flat">{count}</Chip>}
      </div>
      {actions && <div className="stack">{actions}</div>}
    </Heading>
    {children}
  </div>
);
