'use server';

import { revalidatePath } from 'next/cache';

import { tagService_deprecated } from '@/features/tag/services/tagService_deprecated';

export async function createTag(...args: Parameters<typeof tagService_deprecated.create>) {
  const res = await tagService_deprecated.create(...args);

  if (res.error) return;

  revalidatePath('/tags');

  return res;
}
