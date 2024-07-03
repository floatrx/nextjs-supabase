'use server';

import { z } from 'zod';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { PostIDSchema } from '@/features/post/actions/validators/postIDSchema';
import { PostUpdateSchema } from '@/features/post/actions/validators/postUpdateSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Update post
 * @param id - Post ID
 * @param values - Post values (slug title content & thumbnail)
 */
export const updatePost = baseProcedure
  .input(z.object({ id: PostIDSchema, values: PostUpdateSchema }))
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    const { id, values } = input;

    const res = await ctx.supabase.from('posts').update(values).eq('id', id).select().single();

    // Expose error
    if (res?.error) {
      throw res.error.message;
    }

    return res.data;
  });
