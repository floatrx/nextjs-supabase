import type { Metadata } from 'next';

import { Heading } from '@/components/ui/layout/headings/Heading';
import { upperFirst } from '@/lib/string';

interface IProps {
  title?: string;
  // use metadata const for sync title
  meta?: Metadata;
  // slot for actions
  actions?: React.ReactNode;
  // slot for icon
  icon?: React.ReactNode;
  // slot for extra
  before?: React.ReactNode;
}

export const Page: FC<IProps> = ({ meta, title, actions, icon, before, children }) => (
  <>
    {before}
    <Heading className="stack">
      <div>
        <span>{icon}</span> {upperFirst(String(meta?.title) ?? title)}
      </div>
      <div>{actions}</div>
    </Heading>
    {children}
  </>
);
