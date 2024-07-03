'use server';

import { revalidatePath } from 'next/cache';

import { NoteDeleteSchema } from '@/features/note/actions/validators/noteDeleteSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Delete note by id
 * @tag server-action
 * @param id
 */
export const deleteNote = authedProcedure
  .input(NoteDeleteSchema)
  .onSuccess(() => revalidatePath('/notes'))
  .handler(async ({ ctx, input: id }) => {
    return ctx.supabase.from('notes').delete().eq('id', id);
  });
