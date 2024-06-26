import { createServerClient } from '@/lib/supabase/server';

/**
 * Note service
 * - Create
 * - Search
 * - Remove
 */
export const noteService = {
  /**
   * Create a new note
   * @param title
   */
  async create(title: string) {
    const supabase = await createServerClient();

    return supabase.from('notes').insert({ title });
  },

  /**
   * Search notes
   */
  async search() {
    const supabase = await createServerClient();

    return supabase.from('notes').select().order('id', { ascending: false });
  },

  /**
   * Remove note by ID
   * @param id
   */
  async remove(id: number) {
    const supabase = await createServerClient();

    return supabase.from('notes').delete().eq('id', id);
  },
};
