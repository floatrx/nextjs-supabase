'use server';

import { getUser } from '@/features/auth/actions/getUser';

interface IProps {
  userId?: string;
  when?: boolean;
}

/**
 * Guard for authenticated users
 * @param children - Protected content
 * @param when - Custom condition (optional)
 * @param userId - User ID (optional)
 * @constructor
 */
export const OnlyAuth: FC<IProps> = async ({ children, when = true, userId }) => {
  const [user] = await getUser();

  // Check auth
  if (!user) return null;

  // Check if user is the same
  if (userId && user.id !== userId) return null;

  // Custom condition
  if (!when) return null;

  return <>{children}</>;
};
