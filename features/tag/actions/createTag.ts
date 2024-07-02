'use server';

import { revalidatePath } from 'next/cache';

import { tagService } from '@/features/tag/services/tagService';

export async function createTag(...args: Parameters<typeof tagService.create>) {
  const res = await tagService.create(...args);

  if (res.error) return;

  revalidatePath('/tags');

  return res;
}
