'use server';

import type { FormAction } from '@/types/form';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { getMessageFromIssues } from '@/lib/utils';
import { postCreateSchema, postUpdateSchema } from '@/validators/postSchema';

export const postCreate: FormAction = async (_, data) => {
  const formData = Object.fromEntries(data);

  const parsed = postCreateSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      statusText: `Invalid form data. Check issues ${getMessageFromIssues(parsed.error.issues)} `,
      status: 400,
    };
  }

  const supabase = await createClient();
  let payload: Record<string, string | number> = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    content: parsed.data.content,
  };

  const { status, statusText } = await supabase
    // Create a new post
    .from('posts')
    .insert(payload);

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

  const supabase = await createClient();

  const { id, title, content, slug } = parsed.data;
  const dto = { title, content, slug };

  const { error, status, statusText } = await supabase
    // Update the post
    .from('posts')
    .update(dto)
    .eq('id', id);

  revalidatePath('/blog/edit/[id]');

  if (error) {
    return { statusText, status };
  }

  return { statusText: 'Updated successfully!', status };
};
