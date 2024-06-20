import { redirect } from 'next/navigation';

import { authService } from '@/server/services/auth';

// Get user UUId
export const getUserId = async (): Promise<string | undefined> => {
  const user = await authService.getUser();

  return user?.id;
};

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const uid = await getUserId();

  if (!uid) redirect('/login');
};
