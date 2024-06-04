import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AuthButton() {
  const supabase = await createClient();
  const { user } = await supabase.auth.getUser().then(({ data }) => data);

  const signOut = async () => {
    'use server';
    const supabase = await createClient();

    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Image src={user.user_metadata.avatar_url} alt="User avatar" className="w-8 h-8 rounded-full" width={24} height={24} />
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}
