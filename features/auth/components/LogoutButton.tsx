'use client';

import { LogOut } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { signOut } from '@/features/auth/actions/signOut';
import { Button } from '@heroui/button';

export const LogoutButton = () => {
  const { isPending, execute: logout } = useServerAction(signOut);

  return (
    <Button
      data-testid="logout-button"
      isIconOnly
      isLoading={isPending}
      size="md"
      title="Logout"
      variant="light"
      onPress={() => logout()}
    >
      <LogOut size="1.8cap" />
    </Button>
  );
};
