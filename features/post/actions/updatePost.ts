'use server';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';

export const updatePost = async (...args: Parameters<typeof postService.update>) => {
  const res = await postService.update(...args);

  if (res.error) return;

  revalidatePath('/');

  return res;
};
