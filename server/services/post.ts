/**
 * TODO: Move all the logic related to
 *  the post entity here (validations & queries)
 */
import { createServerClient } from '@/lib/supabase/server';
import { postSearchSchema } from '@/schemas/postSchema';

interface SearchParams {
  title?: string;
}

export const postService = {
  async search({ title }: SearchParams = {}) {
    const parsed = postSearchSchema.safeParse({ title });

    const supabase = await createServerClient();

    let query = supabase.from('posts').select(
      `*,
      author: profiles (*, role: roles (*))`,
    );

    if (parsed.data?.title) {
      query = query.eq('title', parsed.data?.title);
    }

    return query.order('created_at', { ascending: false });
  },
  async delete(id: string) {
    const supabase = await createServerClient();

    return supabase.from('posts').delete().eq('id', id);
  },
};
