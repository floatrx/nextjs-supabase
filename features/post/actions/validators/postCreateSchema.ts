import { z } from 'zod';

import { createSlug } from '@/features/post/lib/createSlug';

/**
 * Post create schema
 */
export const PostCreateSchema = z.object({
  slug: z.string().trim().min(1, 'Slug is required').transform(createSlug),
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
  thumbnail: z.string().optional().nullable(),
});
