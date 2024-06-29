'use server';

import type { TNote } from '@/types/note';

import { revalidatePath } from 'next/cache';

import { noteService } from '@/features/note/services/noteService';

export async function deleteNote(id: TNote['id']) {
  const { error } = await noteService.remove(id);

  if (error) return;

  revalidatePath('/notes');
}
