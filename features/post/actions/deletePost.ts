'use server';

import type { TPost } from '@/types/post';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';

export const deletePost = async (id: TPost['id']) => {
  const { error } = await postService.delete(id);

  if (error) return;

  revalidatePath('/');
};
