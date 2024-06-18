'use server';

import type { FormAction } from '@/types/form';

import { revalidatePath } from 'next/cache';

import { createServerClient } from '@/lib/supabase/server';
import { getMessageFromIssues } from '@/lib/utils';
import { postCreateSchema, postUpdateSchema } from '@/validations/post';

export const postCreate: FormAction = async (_, data) => {
  const formData = Object.fromEntries(data);

  const parsed = postCreateSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      statusText: `Invalid form data. Check issues ${getMessageFromIssues(parsed.error.issues)} `,
      status: 400,
    };
  }

  const supabase = await createServerClient();
  let payload: Record<string, string | number> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    content: parsed.data.content,
  };

  // TODO: Move to postService
  const { status, statusText } = await supabase
    // Create a new post
    .from('posts')
    .insert(payload);

  // TODO: Review revalidation strategy
  revalidatePath('/');

  // TODO: Use formatPostgrestResponse
  return { statusText, status };
};

export const postUpdate: FormAction = async (_, data) => {
  const formData = Object.fromEntries(data);

  const parsed = postUpdateSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      statusText: `Invalid form data. Check issues ${getMessageFromIssues(parsed.error.issues)} `,
      status: 400,
    };
  }

  const supabase = await createServerClient();

  const { id, title, content, slug } = parsed.data;
  const dto = { title, content, slug };

  // TODO: Move to postService
  const { error, status, statusText } = await supabase
    // Update the post
    .from('posts')
    .update(dto)
    .eq('id', id);

  revalidatePath('/blog/edit/[id]');

  // TODO: Use formatPostgrestResponse
  if (error) {
    return { statusText, status };
  }

  return { statusText: 'Updated successfully!', status };
};
