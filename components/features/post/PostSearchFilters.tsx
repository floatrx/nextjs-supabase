'use client';

import { Input } from '@nextui-org/input';

import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps {}
export const PostSearchFilters: RC<IProps> = (props) => {
  const [title, setTitle] = useSearchParamState('title');

  return <Input isClearable defaultValue={title} placeholder="Search posts" size="lg" onChange={(e) => setTitle(e.target.value)} />;
};
