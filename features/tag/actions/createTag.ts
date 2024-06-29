'use server';

import { revalidatePath } from 'next/cache';

import { noteService } from '@/features/note/services/noteService';
import { tagService } from '@/features/tag/services/tagService';

export async function createTag(...args: Parameters<typeof noteService.create>) {
  const res = await tagService.create(...args);

  if (res.error) return;

  revalidatePath('/tags');

  return res;
}
