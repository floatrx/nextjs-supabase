'use server';

import { authService } from '@/features/auth/services/auth';

interface IProps {
  idUser?: string;
  when?: boolean;
}

/**
 * Guard for authenticated users
 * @param children
 * @param when
 * @param idUser
 * @constructor
 */
export const OnlyAuth: FC<IProps> = async ({ children, when = true, idUser }) => {
  const user = await authService.getUser();

  // Check auth
  if (!user) return null;

  // Check if user is the same
  if (idUser && user.id !== idUser) return null;

  // Custom condition
  if (!when) return null;

  return <>{children}</>;
};
