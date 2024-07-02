'use server';

import { revalidatePath } from 'next/cache';

import { RemovePostTagSchema } from '@/features/post/actions/validators/removePostTagSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

export const removePostTag = authedProcedure
  .input(RemovePostTagSchema)
  .onComplete(() => revalidatePath('/'))
  .handler(({ ctx, input }) => {
    return ctx.supabase.from('post_tags').delete().eq('post_id', input.postId).eq('tag_id', input.tagId);
  });
