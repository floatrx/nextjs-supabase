import type { TPostCreate, PostSearchParams, TPostUpdate, TPost } from '@/types/post';

import { idSchema } from '@/features/post/validators/idSchema';
import { postCreateSchema, postSearchSchema, postUpdateSchema } from '@/features/post/validators/post';
import { formatResultWithPagesCount } from '@/lib/supabase/formatters';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Post service
 * - Create
 * - Search
 * - Get by ID
 * - Get by slug
 * - Update
 * - Delete
 */
export const postService = {
  /**
   * Create a new post
   * @param payload
   */
  async create(payload: TPostCreate) {
    const supabase = await createServerClient();
    const { error, data } = postCreateSchema.safeParse(payload);

    if (error) {
      return { error };
    }

    return supabase.from('posts').insert(data).select().single();
  },

  /**
   * Search posts
   * TODO: Move defaults (page, limit) to a constants
   * @param title - Post title
   * @param page - Page number (default: 1)
   * @param limit - Number of items per page (default: 8)
   */
  async search({ title, page = 1, limit = 8 }: PostSearchParams = {}) {
    const supabase = await createServerClient();
    const parsed = postSearchSchema.safeParse({ title });

    let query = supabase.from('posts').select(
      `*,
      author: profiles (*, role: roles (*))`,
      { count: 'exact' },
    );

    if (parsed.data?.title) {
      // Exact
      // query = query.eq('title', parsed.data?.title);
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
      author: profiles (*, role: roles (*))`,
      )
      .eq(column, value)
      .single();
  },

  /**
   * Get a post by ID
   * @param id
   */
  async getById(id: TPost['id']) {
    const { error, data } = idSchema.safeParse(id);

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

  /**
   * Update a post from payload
   * @param id - Post ID
   * @param payload - changes
   */
  async update(id: TPost['id'], payload: TPostUpdate) {
    const { error, data } = postUpdateSchema.safeParse(payload);

    if (error) {
      return { error };
    }

    const supabase = await createServerClient();

    return supabase.from('posts').update(data).eq('id', id).select().single();
  },

  /**
   * Delete a post by ID
   * @param id
   */
  async delete(id: TPost['id']) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },
};
