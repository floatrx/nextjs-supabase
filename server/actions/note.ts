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
