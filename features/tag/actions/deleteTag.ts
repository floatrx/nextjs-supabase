'use server';

import type { TNote } from '@/types/note';

import { revalidatePath } from 'next/cache';

import { tagService } from '@/features/tag/services/tagService';

export async function deleteTag(id: TNote['id']) {
  const { error } = await tagService.remove(id);

  if (error) return;

  revalidatePath('/notes');
}
