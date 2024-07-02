import { Page } from '@/components/ui/layout/Page';
import { getProfile } from '@/features/auth/actions/getProfile';
import { UserProfileForm } from '@/features/user/components/UserProfileForm';

export default async function ProfilePage() {
  const [user] = await getProfile();

  if (!user) return null;

  return (
    <Page title="Profile page">
      <UserProfileForm id={user.id} initialValues={user.profile} />
    </Page>
  );
}
