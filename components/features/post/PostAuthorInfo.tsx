import type { TPostWithAuthor } from '@/types/post';

import { Image } from '@nextui-org/image';
import { CircleUserRound } from 'lucide-react';

interface IProps extends Pick<TPostWithAuthor, 'author'> {}

export const PostAuthorInfo: RC<IProps> = ({ author }) => {
  if (!author) return null;
  const { username, email, avatar } = author;

  return (
    <span className="flex items-center gap-2 sm:inline-flex">
      {avatar ? <Image alt="avatar" className="h-6 w-6 rounded-full" src={avatar} /> : <CircleUserRound size={18} />}
      {username || email}
    </span>
  );
};
