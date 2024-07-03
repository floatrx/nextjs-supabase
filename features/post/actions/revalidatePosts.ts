import { revalidatePath } from 'next/cache';

/**
 * Revalidate posts
 * NOTE: This invalidation should be updated to be more specific
 * @tag invalidation
 */
export const revalidatePosts = () => revalidatePath('/');
