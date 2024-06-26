'use server';

import { authService } from '@/features/auth/services/auth';

export const OnlyAuth: FC = async ({ children }) => {
  const user = await authService.getUser();

  return user ? <>{children}</> : null;
};
