'use server';

import type { TPostId } from '@/types/post';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/postService';

export const deletePost = async (id: TPostId) => {
  const { error } = await postService.delete(id);

  if (error) return;

  revalidatePath('/');
};
