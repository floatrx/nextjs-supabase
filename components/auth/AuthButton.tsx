import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export const AuthButton = async () => {
  const supabase = await createClient();
  const { user } = await supabase.auth.getUser().then(({ data }) => data);

  const avatar = user?.user_metadata.avatar_url;

  const signOut = async () => {
    'use server';
    const supabase = await createClient();

    await supabase.auth.signOut();

    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      {avatar ? (
        <Image alt="User avatar" className="h-8 w-8 rounded-full" height={24} src={user.user_metadata.avatar_url} width={24} />
      ) : (
        <UserCircle />
      )}
      {user.email}
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">Logout</button>
      </form>
    </div>
  ) : (
    <Link className="flex rounded-md bg-btn-background px-3 py-2 text-foreground no-underline hover:bg-btn-background-hover" href="/login">
      Login
    </Link>
  );
};
