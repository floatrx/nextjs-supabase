import { redirect } from 'next/navigation';

import { createServerClient } from '@/lib/supabase/server';

// Get user UUId
export const getUserId = async (): Promise<string | undefined> => {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();

  return data.user?.id;
};

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const uid = await getUserId();

  if (!uid) redirect('/login');
};
