'use server';

import type { FormAction } from '@/types/form';
import type { TPostUpdate, TPost } from '@/types/post';

import { revalidatePath } from 'next/cache';

import { postService } from '@/features/post/services/post';
import { formatFormActionResponse } from '@/lib/supabase/formatters';
import { parseFormData } from '@/lib/utils';

export const postUpdate: FormAction<TPost> = async (_, data) => {
  const payload = parseFormData<TPostUpdate>(data);
  const res = await postService.update(payload);

  revalidatePath('/');

  return formatFormActionResponse(res);
};
