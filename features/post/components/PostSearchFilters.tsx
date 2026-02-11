'use client';

import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';

import { Input } from '@/lib/heroui';
import { Spinner } from '@/lib/heroui';

interface IProps {}
export const PostSearchFilters: RC<IProps> = () => {
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useQueryState(
    'title',
    parseAsString.withDefault('').withOptions({
      startTransition,
      throttleMs: 1000,
      clearOnDefault: true,
      shallow: false,
    }),
  );

  return (
    <Input
      isClearable
      color="primary"
      defaultValue={title}
      endContent={isPending && <Spinner size="sm" />}
      placeholder="Search posts"
      size="lg"
      startContent={<Search />}
      variant="bordered"
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
