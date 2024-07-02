'use server';

import { revalidatePath } from 'next/cache';

import { NoteDeleteSchema } from '@/features/note/actions/validators/noteDeleteSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

export const deleteNote = authedProcedure
  .input(NoteDeleteSchema)
  .onSuccess(() => revalidatePath('/notes'))
  .handler(async ({ ctx, input: id }) => ctx.supabase.from('notes').delete().eq('id', id));
