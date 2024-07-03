'use server';

import { revalidatePath } from 'next/cache';

import { NoteCreateSchema } from '@/features/note/actions/validators/noteCreateSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Create note by title
 * @tag server-action
 * @param title
 * @returns SupabaseSingleResponse<TNote>
 */
export const createNote = authedProcedure
  .input(NoteCreateSchema)
  .onSuccess(() => revalidatePath('/notes'))
  .handler(async ({ ctx, input }) => ctx.supabase.from('notes').insert(input).select().single());
