'use server';
import type { FormAction } from '@/types/form';
import type { TPostUpdate } from '@/types/post';

import { formatStatusResponse } from '@/lib/supabase/formatResponse';
import { parseFormData } from '@/lib/utils';
import { postService } from '@/server/services/post';

export const postCreate: FormAction = async (_, data) => {
  const payload = Object.fromEntries(data);
  const res = await postService.create(payload);

  return formatStatusResponse(res);
};

export const postUpdate: FormAction = async (_, data) => {
  const payload = parseFormData<TPostUpdate>(data);
  const res = await postService.update(payload);

  return formatStatusResponse(res);
};
