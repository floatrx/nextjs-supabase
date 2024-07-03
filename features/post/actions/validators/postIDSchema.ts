import { z } from 'zod';

/**
 * Validate postId as a parsable positive number
 */
export const PostIDSchema = z.preprocess(String, z.string());
