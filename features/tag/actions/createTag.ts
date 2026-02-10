'use server';

import { revalidateTags } from '@/features/tag/actions/revalidateTags';
import { TagCreateSchema } from '@/features/tag/actions/validators/tagCreateSchema';
import { adminProcedure } from '@/lib/zsa/adminProcedure';

/**
 * Create tag (admin only)
 * @param name - Tag name
 * @tag server-action
 */
export const createTag = adminProcedure
  .input(TagCreateSchema)
  .onSuccess(revalidateTags)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('tags').insert(input).select().single();
  });
