import type { PostSearchParams, TPostId } from '@/types/post';

import { PostIDSchema } from '@/features/post/actions/validators/postIDSchema';
import { PostSearchSchema } from '@/features/post/actions/validators/postSearchSchema';
import { formatResultWithPagesCount } from '@/lib/supabase/formatters';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Post service
 * - Search
 * - Get by ID
 * - Get by slug
 */

export const postService = {
  /**
   * Search posts
   * TODO: Move defaults (page, limit) to a constants
   * @param title - Post title
   * @param page - Page number (default: 1)
   * @param limit - Number of items per page (default: 8)
   */
  async search({ title, page = 1, limit = 8 }: PostSearchParams = {}) {
    const supabase = await createServerClient();
    const parsed = PostSearchSchema.safeParse({ title });

    let query = supabase.from('posts').select(
      `*,
        author: profiles (*, role: roles (*)),
        tags: post_tags (id:tag_id, tag: tags (id, name))
      `,
      { count: 'exact' },
    );

    if (parsed.data?.title) {
      query = query.ilike('title', `%${parsed.data.title}%`);
    }

    if (page) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit - 1;

      query = query.range(startIndex, endIndex);
    }

    const result = await query.order('created_at', { ascending: false });

    return formatResultWithPagesCount(result, limit);
  },

  /**
   * Get a post by ID or slug
   * @param column
   * @param value
   */
  async get(column: 'id' | 'slug', value: string) {
    const supabase = await createServerClient();

    return supabase
      .from('posts')
      .select(
        `*,
        author: profiles (*, role: roles (*)),
        tags: post_tags (id:tag_id, tag: tags (id, name))
      `,
      )
      .eq(column, value)
      .single();
  },

  /**
   * Get a post by ID
   * @param id
   */
  async getById(id: TPostId) {
    const { error, data } = PostIDSchema.safeParse(id);

    if (error) {
      return { error, data: null };
    }

    return this.get('id', data);
  },

  /**
   * Get a post by slug
   * @param slug
   */
  async getBySlug(slug: string = '') {
    return this.get('slug', slug);
  },
};
