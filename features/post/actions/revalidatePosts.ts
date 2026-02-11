import { revalidateTag } from 'next/cache';

/**
 * Revalidate posts cache
 * Uses tag-based invalidation with stale-while-revalidate semantics
 */
export const revalidatePosts = async () => revalidateTag('posts', 'max');
