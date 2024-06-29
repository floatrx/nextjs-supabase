import { Page } from '@/components/ui/layout/Page';
import { authService } from '@/features/auth/services/authService';
import { UserProfileForm } from '@/features/user/components/UserProfileForm';

export default async function ProfilePage() {
  const user = await authService.getProfile();

  if (!user) return null;

  return (
    <Page title="Profile page">
      <UserProfileForm id={user.id} initialValues={user.profile} />
    </Page>
  );
}
