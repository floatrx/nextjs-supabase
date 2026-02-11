import { Page } from '@/components/ui/layout/Page';
import { getProfile } from '@/features/auth/actions/getProfile';
import { UserAvatar } from '@/features/user/components/UserAvatar';
import { UserProfileForm } from '@/features/user/components/UserProfileForm';
import { Card, CardBody } from '@/lib/heroui';
import { Chip } from '@/lib/heroui';
import { upperFirst } from '@/lib/utils/upperFirst';

export default async function ProfilePage() {
  const [user] = await getProfile();

  if (!user) return null;

  const { profile } = user;
  const roleName = (profile.role as { name: string } | null)?.name || 'user';
  const displayName = profile.username || 'there';

  return (
    <Page title="Profile">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Welcome Card */}
        <Card className="from-primary/10 to-secondary/10 bg-gradient-to-r">
          <CardBody className="flex flex-row items-center gap-6 p-6">
            <UserAvatar className="ring-background size-24 ring-4" src={profile.avatar} />
            <div>
              <p className="text-muted-foreground">Welcome back,</p>
              <h2 className="text-3xl font-bold">{upperFirst(displayName)}!</h2>
              <div className="mt-2 flex items-center gap-2">
                <Chip color={roleName === 'admin' ? 'danger' : 'primary'} size="sm" variant="flat">
                  {upperFirst(roleName)}
                </Chip>
                <span className="text-muted-foreground text-sm">{user.email}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardBody className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Settings</h3>
            <UserProfileForm id={user.id} initialValues={profile} />
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}
