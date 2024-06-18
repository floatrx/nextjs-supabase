import { z } from 'zod';

import { postId } from './common';

import { createSlug } from '@/lib/utils';

export const postCreateSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required').transform(createSlug),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
});

// extend the postCreateSchema as optional fields
export const postUpdateSchema = postCreateSchema.partial().extend({
  id: postId, // id is required
});
