'use server';

import { z } from 'zod';

import { revalidateTags } from '@/features/tag/actions/revalidateTags';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Delete tag by ID
 * @param id - Tag ID
 * @tag server-action
 */
export const deleteTag = authedProcedure
  .input(z.object({ id: z.number() }))
  .onSuccess(revalidateTags)
  .handler(({ ctx, input }) => {
    return ctx.supabase.from('tags').delete().eq('id', input.id);
  });
