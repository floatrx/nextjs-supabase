'use server';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { PostCreateSchema } from '@/features/post/actions/validators/postCreateSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

export const createPost = baseProcedure
  .input(PostCreateSchema)
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('posts').insert(input).select().single();
  });
