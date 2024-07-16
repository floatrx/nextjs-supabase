import useSWR from 'swr';

import { searchTags } from '@/features/tag/actions/searchTags';
import { zsaFetcher } from '@/lib/zsa/zsaFetcher';

/**
 * Fetch post tags from API using SWR (cached)
 */
export const usePostTags = () => {
  const { data, error, isLoading } = useSWR('tags', zsaFetcher(searchTags));

  return {
    tags: data ?? [],
    isFetchingTags: isLoading,
    error,
  };
};
