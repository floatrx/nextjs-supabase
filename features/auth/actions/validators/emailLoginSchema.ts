import { z } from 'zod';

export const EmailLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});
