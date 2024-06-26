import type { TPostWithAuthor } from '@/types/post';

import { UserAvatar } from '@/features/user/components/UserAvatar';

interface IProps extends Pick<TPostWithAuthor, 'author'> {}

export const PostAuthorInfo: RC<IProps> = ({ author }) => {
  if (!author) return null;
  const { username, email, avatar } = author;

  return (
    <span className="flex items-center gap-2 sm:inline-flex">
      <UserAvatar src={avatar} />
      {username || email}
    </span>
  );
};
