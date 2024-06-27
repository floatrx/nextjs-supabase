'use server';

import { revalidatePath } from 'next/cache';

import { noteService } from '@/features/note/services/note';

export async function createNote(...args: Parameters<typeof noteService.create>) {
  const res = await noteService.create(...args);

  if (res.error) return;

  revalidatePath('/notes');

  return res;
}
