'use server';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { PostCreateSchema } from '@/features/post/actions/validators/postCreateSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Create post
 * @tag server-action
 * @param slug - Post slug
 * @param title - Post title
 * @param content - Post content
 * @param thumbnail - Post thumbnail
 * @returns Created post
 */
export const createPost = baseProcedure
  .input(PostCreateSchema)
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('posts').insert(input).select().single();
  });
