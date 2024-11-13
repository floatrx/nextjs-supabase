'use client';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { signOut } from '@/features/auth/actions/signOut';

export const LogoutButton = () => {
  const { isPending, execute: logout } = useServerAction(signOut);

  return (
    <Button isIconOnly isLoading={isPending} size="md" title="Logout" variant="light" onClick={() => logout()}>
      <LogOut size="1.8cap" />
    </Button>
  );
};
