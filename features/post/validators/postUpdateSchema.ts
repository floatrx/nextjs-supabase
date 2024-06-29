import { PostCreateSchema } from '@/features/post/validators/postCreateSchema';

/**
 * Post update schema
 * Extend the postCreateSchema as optional fields
 */
export const PostUpdateSchema = PostCreateSchema.partial();
