/**
 * TODO: Refactor to ZSA and remove it!
 */
import type { TTagId } from '@/types/tag';

import { TagCreateSchema } from '@/features/tag/actions/validators/tagCreateSchema';
import { createServerClient } from '@/lib/supabase/server';

/**
 * Tag service
 * @deprecated
 * - Create
 * - Search
 * - Remove
 */
export const tagService_deprecated = {
  /**
   * Create a new tag
   * @param name
   */
  async create(name?: string | null) {
    const { error, data } = TagCreateSchema.safeParse({ name });

    if (error) {
      return { error };
    }

    const supabase = await createServerClient();

    return supabase.from('tags').insert(data).select().single();
  },

  /**
   * Search tags
   */
  async search() {
    const supabase = await createServerClient();

    return supabase.from('tags').select().order('id', { ascending: false });
  },

  /**
   * Remove tag by ID
   * @param id
   */
  async remove(id: TTagId) {
    const supabase = await createServerClient();

    return supabase.from('tags').delete().eq('id', id);
  },
};