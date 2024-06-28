import type { TPostExtended } from '@/types/post';

import { UserIcon } from 'lucide-react';
import Image from 'next/image';

interface IProps extends Pick<TPostExtended, 'author'> {}

export const PostAuthorAvatar: RC<IProps> = ({ author, ...avatarProps }) =>
  author?.avatar ? (
    <Image
      alt="avatar"
      className="size-[32px] rounded-3xl text-tiny"
      height={64}
      src={author?.avatar}
      width={64}
      {...avatarProps}
    />
  ) : (
    <UserIcon className="size-[32px] text-tiny" />
  );
