import type { TPostCreate, PostSearchParams, TPostUpdate } from '@/types/post';

import { formatInvalidParseResponse, formatStatusErrorResponse, formatResultWithPagesCount } from '@/lib/supabase/formatters';
import { createServerClient } from '@/lib/supabase/server';
import { idScheme } from '@/validators/common';
import { postCreateSchema, postSearchSchema, postUpdateSchema } from '@/validators/post';

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
    const parsed = postCreateSchema.safeParse(payload);

    if (!parsed.success) {
      return formatInvalidParseResponse(parsed);
    }

    return supabase.from('posts').insert(parsed.data).select().single();
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
  async getById(id?: string) {
    if (!id || !idScheme.safeParse(id).success) {
      return formatStatusErrorResponse('Invalid ID');
    }

    return this.get('id', id);
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
   * @param payload
   */
  async update(payload: TPostUpdate) {
    const supabase = await createServerClient();
    const parsed = postUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return formatInvalidParseResponse(parsed);
    }

    const { id, ...changes } = parsed.data;

    return supabase.from('posts').update(changes).eq('id', id).select().single();
  },

  /**
   * Delete a post by ID
   * @param id
   */
  async delete(id: string) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },
};
