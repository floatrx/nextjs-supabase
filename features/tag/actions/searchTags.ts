'use server';

import { tagService_deprecated } from '@/features/tag/services/tagService_deprecated';

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
  return tagService_deprecated.search();
}
