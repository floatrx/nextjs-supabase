/**
 * TODO: REFACTOR THIS SKETCH...
 *  1. create profile service and move db operations there...
 *  2. add validations (zod)
 *  3. add error handling
 *  4. add types
 */

'use server';

import type { Tables } from '@/types/supabase';

import { revalidatePath } from 'next/cache';

import { createServerClient } from '@/lib/supabase/server';

type TPayload = Partial<Pick<Tables<'profiles'>, 'avatar' | 'username'>>;

export const updateUserProfile = async (idProfile: string, payload: TPayload) => {
  const supabase = createServerClient();

  const res = await supabase.from('profiles').update(payload).eq('id', idProfile);

  revalidatePath('/');

  return res;
};
