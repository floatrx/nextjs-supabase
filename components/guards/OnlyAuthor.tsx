'use server';

import { authService } from '@/features/auth/services/auth';

interface IProps {
  id: string | undefined;
}

export const OnlyAuthor: FC<IProps> = async ({ children, id }) => {
  const user = await authService.getUser();

  return user?.id === id ? <>{children}</> : null;
};
