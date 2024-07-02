'use server';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { AddPostTagSchema } from '@/features/post/actions/validators/addPostTagSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

export const addPostTag = baseProcedure
  .input(AddPostTagSchema)
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('post_tags').insert({ post_id: input.postId, tag_id: input.tagId });
  });
