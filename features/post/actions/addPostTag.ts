'use server';

import { revalidatePosts } from '@/features/post/actions/revalidatePosts';
import { AddPostTagSchema } from '@/features/post/actions/validators/addPostTagSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Add tag to post
 * @tag server-action
 * @param postId - Post ID
 * @param tagId - Tag ID
 * @returns Supabase response
 */
export const addPostTag = baseProcedure
  .input(AddPostTagSchema)
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('post_tags').insert({ post_id: input.postId, tag_id: input.tagId });
  });
