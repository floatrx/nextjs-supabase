import type { TPostCreate, PostSearchParams, TPostUpdate, TPostId } from '@/types/post';
import type { TTagId } from '@/types/tag';

import { PostIDSchema } from '@/features/post/validators/postIDSchema';
import { formatResultWithPagesCount } from '@/lib/supabase/formatters';
import { createServerClient } from '@/lib/supabase/server';
import { PostCreateSchema } from '@/features/post/validators/postCreateSchema';
import { PostUpdateSchema } from '@/features/post/validators/postUpdateSchema';
import { PostSearchSchema } from '@/features/post/validators/postSearchSchema';

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
    const { error, data } = PostCreateSchema.safeParse(payload);

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
    console.log('title', { page, limit });

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

  /**
   * Update a post from payload
   * @param id - Post ID
   * @param payload - changes
   */
  async update(id: TPostId, payload: TPostUpdate) {
    const { error, data } = PostUpdateSchema.safeParse(payload);

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
  async delete(id: TPostId) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },

  /**
   * Add a tag to a post
   * @param postId
   * @param tagId
   */
  async addTag(postId: TPostId, tagId: TTagId) {
    const supabase = await createServerClient();

    return supabase.from('post_tags').insert({ post_id: postId, tag_id: tagId });
  },

  /**
   * Remove a tag from a post
   * @param postId
   * @param tagId
   */
  async removeTag(postId: TPostId, tagId: TTagId) {
    const supabase = await createServerClient();

    return supabase.from('post_tags').delete().eq('post_id', postId).eq('tag_id', tagId);
  },
};
