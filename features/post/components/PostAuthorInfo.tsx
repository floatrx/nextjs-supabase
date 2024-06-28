import type { TPostExtended } from '@/types/post';

import { Chip } from '@nextui-org/chip';

import { UserAvatar } from '@/features/user/components/UserAvatar';

interface IProps extends Pick<TPostExtended, 'author'> {}

export const PostAuthorInfo: RC<IProps> = ({ author }) => {
  if (!author) return null;
  const { username, email, avatar } = author;

  return (
    <span className="flex items-center gap-2 sm:inline-flex">
      <UserAvatar src={avatar} />
      <strong>{username || email}</strong>

      <Chip size="sm" variant="bordered">
        {author?.role?.name}
      </Chip>
    </span>
  );
};
