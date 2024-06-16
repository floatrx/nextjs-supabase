import { createClient } from '@/lib/supabase/server';
import { postSearchSchema } from '@/validators/postSchema';

interface SearchParams {
  title?: string;
}

export const postService = {
  async searchPosts({ title }: SearchParams = {}) {
    const parsed = postSearchSchema.safeParse({ title });

    const supabase = await createClient();

    let query = supabase.from('posts').select(
      `*,
      author: profiles (*, role: roles (*))`,
    );

    if (parsed.data?.title) {
      query = query.eq('title', parsed.data?.title);
    }

    return query.order('created_at', { ascending: false });
  },
};
