'use server';

import { z } from 'zod';

import { revalidateTags } from '@/features/tag/actions/revalidateTags';
import { adminProcedure } from '@/lib/zsa/adminProcedure';

/**
 * Delete tag by ID (admin only)
 * @param id - Tag ID
 * @tag server-action
 */
export const deleteTag = adminProcedure
  .input(z.object({ id: z.number() }))
  .onSuccess(revalidateTags)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('tags').delete().eq('id', input.id);
  });
