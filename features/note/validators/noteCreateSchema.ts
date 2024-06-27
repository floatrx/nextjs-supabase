import { z } from 'zod';

export const noteCreateSchema = z.object({
  title: z.string({ message: 'Title is required' }).trim().min(3, { message: 'Title must be at least 3 characters' }),
});
