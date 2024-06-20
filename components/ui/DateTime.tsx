import { Calendar } from 'lucide-react';

interface IProps {
  date: string;
}

export const DateTime: RC<IProps> = ({ date }) => {
  return (
    <span className="flex items-center gap-2 sm:inline-flex">
      <Calendar size={18} /> {new Date(date).toLocaleString()}
    </span>
  );
};
