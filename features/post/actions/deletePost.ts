'use server';

import { z } from 'zod';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Delete post
 * @tag server-action
 * @param postId - Post ID
 * @returns Supabase response
 */
export const deletePost = authedProcedure
  .input(z.number())
  .onComplete(revalidatePosts)
  .handler(({ ctx, input }) => {
    return ctx.supabase.from('posts').delete().eq('id', input);
  });
