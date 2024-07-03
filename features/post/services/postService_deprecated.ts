import type { TPostId } from '@/types/post';

import { PostIDSchema } from '@/features/post/actions/validators/postIDSchema';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Post service
 * @deprecated
 * - Get by ID
 * - Get by slug
 */

export const postService_deprecated = {
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
