import { requireLogin } from '@/lib/auth';

export default async function ({ children }: React.PropsWithChildren) {
  await requireLogin();

  return children;
}
