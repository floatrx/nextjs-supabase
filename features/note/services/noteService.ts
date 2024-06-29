import type { TNote } from '@/types/note';

import { NoteCreateSchema } from '@/features/note/validators/noteCreateSchema';
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
  async create(title?: string | null) {
    const { error, data } = NoteCreateSchema.safeParse({ title });

    if (error) {
      return { error };
    }

    const supabase = await createServerClient();

    return supabase.from('notes').insert(data).select().single();
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
  async remove(id: TNote['id']) {
    const supabase = await createServerClient();

    return supabase.from('notes').delete().eq('id', id);
  },
};
