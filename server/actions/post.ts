'use server';
import type { FormAction } from '@/types/form';
import type { TPostUpdate, TPostCreate, TPost } from '@/types/post';

import { formatFormActionResponse } from '@/lib/supabase/formatters';
import { parseFormData } from '@/lib/utils';
import { postService } from '@/server/services/post';

export const postCreate: FormAction<TPost> = async (_, data) => {
  const payload = parseFormData<TPostCreate>(data);
  const res = await postService.create(payload);

  return formatFormActionResponse(res);
};

export const postUpdate: FormAction<TPost> = async (_, data) => {
  const payload = parseFormData<TPostUpdate>(data);
  const res = await postService.update(payload);

  return formatFormActionResponse(res);
};
