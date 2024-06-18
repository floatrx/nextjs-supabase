import { z } from 'zod';

export const postId = z.union([z.string(), z.number()]).refine(
  (value) => {
    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;

    return !isNaN(parsed) && parsed > 0;
  },
  { message: 'Invalid post ID' },
);
