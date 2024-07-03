import { z } from 'zod';

export const UserProfileUpdateSchema = z.object({
  id: z.string().uuid(),
  payload: z.object({
    username: z.string().min(3),
    avatar: z.string().min(1),
  }),
});
