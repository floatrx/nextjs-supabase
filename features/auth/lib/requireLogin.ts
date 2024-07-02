import { redirect } from 'next/navigation';

import { getUser } from '@/features/auth/actions/getUser';

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const [user] = await getUser();

  if (!user) redirect('/login');
};
