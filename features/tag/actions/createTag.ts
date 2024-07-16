'use server';

import { revalidateTags } from '@/features/tag/actions/revalidateTags';
import { TagCreateSchema } from '@/features/tag/actions/validators/tagCreateSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Create tag
 * @param name - Tag name
 * @tag server-action
 */
export const createTag = authedProcedure
  .input(TagCreateSchema)
  .onSuccess(revalidateTags)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('tags').insert(input).select().single();
  });
