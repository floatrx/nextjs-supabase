'use server';

import { revalidatePath } from 'next/cache';

import { createServerClient } from '@/lib/supabase/server';

export async function createNote(formData: FormData) {
  const supabase = await createServerClient();

  const title = formData.get('title') as string;
  const { error } = await supabase.from('notes').insert(
    { title },
    {
      count: 'exact',
    },
  );

  if (error) {
    console.error('Error adding note:', error);

    return;
  }

  revalidatePath('/notes');
}

export const removeNote = async (id: number) => {
  const supabase = await createServerClient();
  const { error } = await supabase.from('notes').delete().eq('id', id);

  if (error) {
    console.error('Error deleting note:', error);

    return;
  }

  revalidatePath('/notes');
};
