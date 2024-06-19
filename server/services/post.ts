/**
 * TODO: Move all the logic related to
 *  the post entity here (validations & queries)
 */

import type { TPostUpdate, TPostCreate } from '@/types/post';

import { formatInvalidParseResponse } from '@/lib/supabase/formatResponse';
import { formatSupabaseErr } from '@/lib/supabase/formatSupabaseErr';
import { createServerClient } from '@/lib/supabase/server';
import { postId } from '@/validators/common';
import { postSearchSchema, postUpdateSchema, postCreateSchema } from '@/validators/post';

interface SearchParams {
  title?: string | null;
  page?: number;
  limit?: number;
}

export const postService = {
  // Create a new post
  async create(payload: TPostCreate) {
    const parsed = postCreateSchema.safeParse(payload);

    if (!parsed.success) {
      return formatInvalidParseResponse(parsed);
    }

    const supabase = await createServerClient();

    return (
      supabase
        // Create a new post
        .from('posts')
        .insert(parsed.data)
        .select()
        .single()
    );
  },

  // Search posts with optional SearchParams
  async search({ title, page = 1, limit = 8 }: SearchParams = {}) {
    const parsed = postSearchSchema.safeParse({ title });

    const supabase = await createServerClient();

    let query = supabase.from('posts').select(
      `*,
      author: profiles (*, role: roles (*))`,
    );

    // Filter by title
    if (parsed.data?.title) {
      query = query.eq('title', parsed.data?.title);
    }

    // Filter by range
    if (page) {
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit - 1;

      query = query.range(startIndex, endIndex);
    }

    return query.order('created_at', { ascending: false });
  },

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

  // Get single post by ID
  async getById(id?: string) {
    // Return Bad Request if ID is invalid with statusText
    if (!id || !postId.safeParse(id).success) {
      return formatSupabaseErr('Invalid ID');
    }

    return this.get('id', id);
  },

  // Get single post by ID
  async getBySlug(slug?: string) {
    // Return Bad Request if ID is invalid with statusText
    if (!slug) {
      return formatSupabaseErr('Invalid slug');
    }

    return this.get('slug', slug);
  },

  // Update post by ID
  async update(payload: TPostUpdate) {
    const parsed = postUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return formatInvalidParseResponse(parsed);
    }

    const { id, ...changes } = parsed.data;
    const supabase = await createServerClient();

    return supabase.from('posts').update(changes).eq('id', id).select().single();
  },

  // Delete post by ID
  async delete(id: string) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },
};
