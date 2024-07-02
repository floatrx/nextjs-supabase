import { z } from 'zod';

export const AddPostTagSchema = z.object({
  postId: z.number(),
  tagId: z.number(),
});
