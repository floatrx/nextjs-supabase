import { z } from 'zod';

export const UserProfileUpdateSchema = z.object({
  idProfile: z.number(),
  payload: z.object({
    username: z.string().min(3),
    avatar: z.string().min(1),
  }),
});
