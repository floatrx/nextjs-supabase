import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

// Get user UUId
export const getUserId = async (): Promise<string | undefined> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data.user?.id;
};

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const uid = await getUserId();

  if (!uid) redirect('/login');
};
