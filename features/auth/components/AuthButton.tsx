import { Button } from '@nextui-org/button';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

import { Submit } from '@/components/ui/form/Submit';
import { signOut } from '@/features/auth/actions/auth';
import { authService } from '@/features/auth/services/auth';
import { UserAvatar } from '@/features/user/components/UserAvatar';

export const AuthButton = async () => {
  const user = await authService.getProfile();

  return user ? (
    <div className="flex items-center gap-2">
      <Link className="stack" href="/profile">
        <UserAvatar src={user.profile?.avatar} />
        <strong>{user.profile?.username || user.email}</strong>
      </Link>
      <form>
        <Submit isIconOnly formAction={signOut} size="md" title="Logout" variant="light">
          <LogOut size={16} />
        </Submit>
      </form>
    </div>
  ) : (
    <Button as={Link} href="/login" size="md" variant="bordered">
      <LogIn size={16} />
      Sign In
    </Button>
  );
};
