import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

import { Submit } from '@/components/ui/form/Submit';
import { signOut } from '@/server/actions/auth';
import { authService } from '@/server/services/auth';

export const AuthButton = async () => {
  const user = await authService.getUser();
  const avatar = user?.user_metadata.avatar_url;

  return user ? (
    <div className="flex items-center gap-4">
      <Image alt="User avatar" className="h-8 w-8 rounded-full" src={user.user_metadata.avatar_url} />
      {user.email}
      <form>
        <Submit isIconOnly formAction={signOut} title="Logout" variant="bordered">
          <LogOut size={16} />
        </Submit>
      </form>
    </div>
  ) : (
    <Button as={Link} href="/login" variant="bordered">
      <LogIn size={16} />
      Login
    </Button>
  );
};
