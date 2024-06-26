'use server';

import type { FormAction } from '@/types/form';
import type { TPost, TPostCreate } from '@/types/post';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';
import { formatFormActionResponse } from '@/lib/supabase/formatters';
import { parseFormData } from '@/lib/utils';

export const postCreate: FormAction<TPost> = async (_, data) => {
  const payload = parseFormData<TPostCreate>(data);
  const res = await postService.create(payload);

  revalidatePath('/');

  return formatFormActionResponse(res);
};
