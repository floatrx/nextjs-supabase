import { z } from 'zod';

import { POST_PER_PAGE } from '@/config/const';
import { parseAsPositiveNumber } from '@/lib/zod/parseAsPositiveNumber';

export type PostSearchParams = z.infer<typeof PostSearchSchema>;

/**
 * Schema for searching posts
 */
export const PostSearchSchema = z.object({
  title: z
    .string()
    .trim()
    .transform((arg) => arg.replace(/[^\w\s]/gi, ''))
    .optional(),
  page: z.preprocess(parseAsPositiveNumber(1), z.number().int().min(1).optional().default(1)),
  limit: z.preprocess(
    parseAsPositiveNumber(POST_PER_PAGE),
    z.number().int().min(1).max(100).optional().default(POST_PER_PAGE),
  ),
});
