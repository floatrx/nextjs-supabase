'use server';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/postService';

export const createPost = async (...args: Parameters<typeof postService.create>) => {
  const res = await postService.create(...args);

  if (res.error) return;

  revalidatePath('/');

  return res;
};
