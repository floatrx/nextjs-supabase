import { Image } from '@nextui-org/image';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

interface IProps {
  className?: string;
  src?: string | null;
  username?: string;
}

export const UserAvatar: RC<IProps> = ({ src, className }) =>
  src ? (
    <Image alt="avatar" className={cn('size-6 rounded-full', className)} src={src} />
  ) : (
    <User className="text-default-500" size={22} />
  );
