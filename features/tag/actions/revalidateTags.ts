import { revalidatePath } from 'next/cache';

/**
 * Revalidate tags
 * @tag invalidation
 */
export const revalidateTags = () => revalidatePath('/tags');
