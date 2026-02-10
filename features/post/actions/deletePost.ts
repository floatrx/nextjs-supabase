'use server';

import { z } from 'zod';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { adminProcedure } from '@/lib/zsa/adminProcedure';

/**
 * Delete post (admin only)
 * @tag server-action
 * @param postId - Post ID
 * @returns Supabase response
 */
export const deletePost = adminProcedure
  .input(z.number())
  .onComplete(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('posts').delete().eq('id', input);
  });
