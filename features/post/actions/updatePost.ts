'use server';

import { z } from 'zod';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { PostIDSchema } from '@/features/post/actions/validators/postIDSchema';
import { PostUpdateSchema } from '@/features/post/actions/validators/postUpdateSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Update post
 * @param id - Post ID
 * @param values - Post values (slug title content & thumbnail)
 */
export const updatePost = authedProcedure
  .input(z.object({ id: PostIDSchema, values: PostUpdateSchema }))
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    const { id, values } = input;

    const res = await ctx.supabase.from('posts').update(values).eq('id', Number(id)).select().single();

    // Expose error
    if (res?.error) {
      throw res.error.message;
    }

    return res.data;
  });
