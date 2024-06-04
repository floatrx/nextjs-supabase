import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

// Check if the user is authenticated
export const checkAuth = async (): Promise<boolean> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  return !!data?.session;
};

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const isLoggedIn = await checkAuth();

  if (!isLoggedIn) {
    redirect('/login');
  }
};
