'use server';

import { tagService } from '@/features/tag/services/tagService';

/**
 * Search tags
 * NOTE: Recommended to use with `useSWR` for caching
 * @example
 * export const usePostTags = () => {
 *   const { data, error, isLoading } = useSWR('tags', searchTags);
 *
 *   return {
 *     tags: data?.data ?? [],
 *     isFetchingTags: isLoading,
 *     error: data?.error ?? error,
 *   };
 * };
 */
export async function searchTags() {
  return tagService.search();
}
