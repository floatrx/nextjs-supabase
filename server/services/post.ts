/**
 * TODO: Move all the logic related to
 *  the post entity here (validations & queries)
 */
import { createServerClient } from '@/lib/supabase/server';
import { postSearchSchema, postUpdateSchema } from '@/validations/post';

interface SearchParams {
  title?: string;
  range?: [number, number]; // tuple: [start, end]
}

export const postService = {
  // Search posts with optional SearchParams
  async search({ title, range }: SearchParams = {}) {
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
    if (range) {
      query = query.range(...range);
    }

    return query.order('created_at', { ascending: false });
  },

  // Get single post by ID
  async get(id: string) {
    const supabase = await createServerClient();

    return supabase
      .from('posts')
      .select(
        `*,
      author: profiles (*, role: roles (*))`,
      )
      .eq('id', id);
  },

  // Update post by ID
  async update(id: string, data: any) {
    const parsed = postUpdateSchema.safeParse(data);
    const supabase = await createServerClient();

    return supabase.from('posts').update(data).eq('id', id);
  },

  // Delete post by ID
  async delete(id: string) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },
};
