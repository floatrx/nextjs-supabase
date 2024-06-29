'use server';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/postService';

export const removePostTag = async (...args: Parameters<typeof postService.removeTag>) => {
  const { error } = await postService.removeTag(...args);

  if (error) return;

  revalidatePath('/');
};
