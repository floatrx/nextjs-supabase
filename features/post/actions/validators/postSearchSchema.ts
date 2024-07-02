import { PostCreateSchema } from '@/features/post/actions/validators/postCreateSchema';

/**
 * Schema for searching posts
 */
export const PostSearchSchema = PostCreateSchema.pick({
  title: true,
}).transform((data) => ({
  // remove special characters from the title
  title: data.title.trim().replace(/[^\w\s]/gi, ''),
}));
