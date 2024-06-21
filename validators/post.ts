import { z } from 'zod';

import { createSlug } from '@/lib/string';
import { idScheme } from '@/validators/common';

export const postCreateSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required').transform(createSlug),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
  thumbnail: z.string().optional(),
});

// extend the postCreateSchema as optional fields
export const postUpdateSchema = postCreateSchema.partial().extend({
  id: idScheme,
});

export const postSearchSchema = postCreateSchema.pick({
  title: true,
});
