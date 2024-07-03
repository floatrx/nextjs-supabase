'use server';

import { getUser } from '@/features/auth/actions/getUser';
import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Get user profile
 * @tag server-action
 * @returns PostgrestSingleResponse<TProfile>
 */
export const getProfile = authedProcedure.handler(async ({ ctx }) => {
  return getUser().then(async ([user, error]) => {
    if (!user || error) return null;

    // Get current user profile
    const profile = await ctx.supabase.from('profiles').select().eq('id', user.id).single();

    return { ...user, profile: profile.data! };
  });
});
