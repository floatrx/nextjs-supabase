import { Tabs, Tab } from '@heroui/tabs';

import { upperFirst } from '@/lib/utils/upperFirst';

const TABS = ['login', 'signup'] as const;

export type AuthTabKey = (typeof TABS)[number];

interface IProps {
  active: AuthTabKey;
  onTabChange: (key: AuthTabKey) => void;
}

export const AuthTabs: RC<IProps> = ({ onTabChange, active }) => (
  <Tabs
    aria-label="Options"
    className="w-full"
    classNames={{ base: 'flex justify-center w-full' }}
    selectedKey={active}
    variant="light"
    onSelectionChange={(key) => onTabChange(key.toString() as AuthTabKey)}
  >
    {TABS.map((key) => (
      <Tab key={key} title={upperFirst(key)} />
    ))}
  </Tabs>
);
