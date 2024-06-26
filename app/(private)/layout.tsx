import { requireLogin } from '@/features/auth/lib/auth';

export default async function ({ children }: React.PropsWithChildren) {
  await requireLogin();

  return children;
}
