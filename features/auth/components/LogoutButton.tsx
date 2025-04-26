'use client';

import { Button } from '@heroui/button';
import { LogOut } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { signOut } from '@/features/auth/actions/signOut';

export const LogoutButton = () => {
  const { isPending, execute: logout } = useServerAction(signOut);

  return (
    <Button isIconOnly isLoading={isPending} size="md" title="Logout" variant="light" onPress={() => logout()}>
      <LogOut size="1.8cap" />
    </Button>
  );
};
