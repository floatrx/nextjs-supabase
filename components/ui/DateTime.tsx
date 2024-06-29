import { Calendar } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

interface IProps {
  date: string;
  className?: string;
}

export const DateTime: RC<IProps> = ({ date, className }) => (
  <span className={cn('flex items-center gap-2 sm:inline-flex', className)}>
    <Calendar size="1.6cap" />{' '}
    {new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
    })}
  </span>
);
