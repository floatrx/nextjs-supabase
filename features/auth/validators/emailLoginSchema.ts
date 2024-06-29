import { z } from 'zod';

export const EmailLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
