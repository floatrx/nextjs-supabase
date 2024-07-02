import { z } from 'zod';

export const RemovePostTagSchema = z.object({
  postId: z.number(),
  tagId: z.number(),
});
