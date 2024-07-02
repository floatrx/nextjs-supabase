'use server';

import { revalidatePath } from 'next/cache';

import { NoteCreateSchema } from '@/features/note/actions/validators/noteCreateSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

export const createNote = authedProcedure
  .input(NoteCreateSchema)
  .onSuccess(() => revalidatePath('/notes'))
  .handler(async ({ ctx, input }) => ctx.supabase.from('notes').insert(input).select().single());
