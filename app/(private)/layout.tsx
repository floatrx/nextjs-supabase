import { requireLogin } from '@/features/auth/lib/requireLogin';

export default async function ({ children }: React.PropsWithChildren) {
  await requireLogin();

  return children;
}
