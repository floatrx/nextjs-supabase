import { redirect } from 'next/navigation';

import { authService } from '@/features/auth/services/auth';

// Redirect to the login page if the user is not authenticated
export const requireLogin = async () => {
  const user = await authService.getUser();

  if (!user) redirect('/login');
};
