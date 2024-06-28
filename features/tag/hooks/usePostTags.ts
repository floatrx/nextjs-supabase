import useSWR from 'swr';

import { searchTags } from '@/features/tag/actions/searchTags';

export const usePostTags = () => {
  const { data, error, isLoading } = useSWR('tags', searchTags);

  return {
    tags: data?.data ?? [],
    isFetchingTags: isLoading,
    error: data?.error ?? error,
  };
};
