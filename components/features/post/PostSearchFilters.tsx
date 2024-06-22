'use client';

import { Input } from '@nextui-org/input';
import { Search } from 'lucide-react';

import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps {}
export const PostSearchFilters: RC<IProps> = () => {
  const [title, setTitle] = useSearchParamState('title');

  return (
    <Input
      isClearable
      color="primary"
      defaultValue={title}
      placeholder="Search posts"
      size="lg"
      startContent={<Search />}
      variant="bordered"
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
