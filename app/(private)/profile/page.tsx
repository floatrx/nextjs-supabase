import { Page } from '@/components/ui/layout/Page';
import { authService } from '@/features/auth/services/auth';
import { ProfileForm } from '@/features/user/components/ProfileForm';

export default async function ProfilePage() {
  const user = await authService.getProfile();

  if (!user) return null;

  return (
    <Page title="Profile page">
      <ProfileForm id={user.id} initialValues={user.profile} />
    </Page>
  );
}
