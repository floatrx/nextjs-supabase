import { z } from 'zod';

import { createSlug } from '@/lib/utils';

const id = z.string().transform((value) => {
  const parsed = parseInt(value, 10);

  if (isNaN(parsed) || parsed < 1) throw new Error('Invalid post ID');

  return parsed;
});
const slug = z.string().trim().min(1, 'Slug is required').transform(createSlug);
const title = z.string().trim().min(1, 'Title is required');
const content = z.string().trim().min(1, 'Content is required');

export const postCreateSchema = z.object({
  slug,
  title,
  content,
});

export const postUpdateSchema = z.object({
  id,
  slug,
  title,
  content,
});
