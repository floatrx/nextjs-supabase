import { LogIn } from 'lucide-react';
import Link from 'next/link';

import { getProfile } from '@/features/auth/actions/getProfile';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { UserAvatar } from '@/features/user/components/UserAvatar';
import { Button } from '@heroui/button';

export const AuthButton = async () => {
  const [user] = await getProfile();

  return user ? (
    <div className="flex items-center gap-2">
      <Link className="stack" href="/profile">
        <UserAvatar src={user.profile?.avatar} />
        <strong>{user.profile?.username || user.email}</strong>
      </Link>
      <LogoutButton />
    </div>
  ) : (
    <Button as={Link} data-testid="login-button" href="/login" size="md" variant="bordered">
      <LogIn size="1.8cap" />
      Login
    </Button>
  );
};
