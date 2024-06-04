import { z } from 'zod';

export const emailLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
