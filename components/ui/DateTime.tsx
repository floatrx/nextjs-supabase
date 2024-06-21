import { Calendar } from 'lucide-react';

interface IProps {
  date: string;
}

export const DateTime: RC<IProps> = ({ date }) => (
  <span className="flex items-center gap-2 sm:inline-flex">
    <Calendar size={18} />{' '}
    {new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })}
  </span>
);
