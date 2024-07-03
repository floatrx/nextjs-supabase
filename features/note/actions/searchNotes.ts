'use server';

import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Search notes (all)
 * @tag server-action
 * @returns TNote[]
 */
export const searchNotes = authedProcedure.handler(async ({ ctx }) => {
  const res = await ctx.supabase.from('notes').select().order('id', { ascending: false });

  if (res.error) {
    throw res.error.message;
  }

  return res.data; // unwrap the data
});
