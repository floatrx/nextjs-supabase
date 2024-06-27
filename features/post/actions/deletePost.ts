'use server';

import type { TPost } from '@/types/post';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';

export const deletePost = async (id: TPost['id']) => {
  const res = await postService.delete(id);

  if (res.error) return;

  revalidatePath('/');
};
