import { Button } from '@nextui-org/button';
import { UserCircle, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Submit } from '@/components/form/Submit';
import { createServerClient } from '@/lib/supabase/server';
import { signOut } from '@/server/actions/auth';

export const AuthButton = async () => {
  const supabase = await createServerClient();
  const { user } = await supabase.auth.getUser().then(({ data }) => data);

  const avatar = user?.user_metadata.avatar_url;

  return user ? (
    <div className="flex items-center gap-4">
      {avatar ? (
        <Image alt="User avatar" className="h-8 w-8 rounded-full" height={24} src={user.user_metadata.avatar_url} width={24} />
      ) : (
        <UserCircle />
      )}
      {user.email}
      <form>
        <Submit isIconOnly formAction={signOut} title="Logout" variant="bordered">
          <LogOut size={16} />
        </Submit>
      </form>
    </div>
  ) : (
    <Button as={Link} href="/login">
      <LogIn size={16} />
      Login
    </Button>
  );
};
