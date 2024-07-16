'use server';

import type { TPostExtended } from '@/types/post';

import { PostSearchSchema } from '@/features/post/actions/validators/postSearchSchema';
import { formatResultWithPagesCount } from '@/lib/supabase/formatters';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Search posts
 * @param title - Post title
 * @param page - Page number (default: 1)
 * @param limit - Number of items per page (default: 8)
 * @returns PostgrestResponse<TPostExtended[]>
 */
export const searchPosts = baseProcedure.input(PostSearchSchema).handler(async ({ ctx, input }) => {
  const { title, page, limit } = input;

  let query = ctx.supabase.from('posts').select(
    `*,
        author: profiles (*, role: roles (*)),
        tags: post_tags (id:tag_id, tag: tags (id, name))
      `,
    { count: 'exact' },
  );

  if (title) {
    query = query.ilike('title', `%${title}%`);
  }

  if (page) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    query = query.range(startIndex, endIndex);
  }

  const result = await query.order('created_at', { ascending: false });

  if (result.error) {
    throw result.error.message;
  }

  return formatResultWithPagesCount<TPostExtended>(result, limit); // unwrap the data
});
