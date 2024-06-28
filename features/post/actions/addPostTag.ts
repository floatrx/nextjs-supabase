'use server';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';

export const addPostTag = async (...args: Parameters<typeof postService.addTag>) => {
  const { error } = await postService.addTag(...args);

  if (error) return;

  revalidatePath('/');
};
