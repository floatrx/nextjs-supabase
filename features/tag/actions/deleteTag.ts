'use server';

import type { TNote } from '@/types/note';

import { revalidatePath } from 'next/cache';

import { tagService_deprecated } from '@/features/tag/services/tagService_deprecated';

export async function deleteTag(id: TNote['id']) {
  const { error } = await tagService_deprecated.remove(id);

  if (error) return;

  revalidatePath('/notes');
}
