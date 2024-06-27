'use server';

import type { TNote } from '@/types/note';

import { revalidatePath } from 'next/cache';

import { noteService } from '@/features/note/services/note';

export async function createNote({ title }: Pick<TNote, 'title'>) {
  const res = await noteService.create(title);

  if (res.error) return;

  revalidatePath('/notes');

  return res;
}
