'use server';

import { revalidatePath } from 'next/cache';

import { UserProfileUpdateSchema } from '@/features/user/actions/validators/userProfileUpdateSchema';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Update user profile
 * @param id - User ID
 * @param payload - User profile values (username, avatar)
 */
export const updateUserProfile = authedProcedure
  .input(UserProfileUpdateSchema)
  .onSuccess(() => revalidatePath('/'))
  .handler(({ ctx, input }) => {
    const { id, payload } = input;

    return ctx.supabase.from('profiles').update(payload).eq('id', id);
  });
