import useSWR from 'swr';

import { searchTags } from '@/features/tag/actions/searchTags';

/**
 * Fetch post tags from API using SWR (cached)
 */
export const usePostTags = () => {
  const { data, error, isLoading } = useSWR('tags', searchTags);

  return {
    tags: data?.data ?? [],
    isFetchingTags: isLoading,
    error: data?.error ?? error,
  };
};
