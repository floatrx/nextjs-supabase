import { PostCreateSchema } from '@/features/post/actions/validators/postCreateSchema';

/**
 * Post update schema
 * Extend the postCreateSchema as optional fields
 */
export const PostUpdateSchema = PostCreateSchema.partial();
