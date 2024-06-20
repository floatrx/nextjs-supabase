import { z } from 'zod';

/**
 * Validate postId as a parsable positive number
 */
export const idScheme = z.union([z.string(), z.number()]).refine(
  (value) => {
    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

    return !isNaN(parsed) && parsed > 0;
  },
  { message: 'Invalid post ID' },
);