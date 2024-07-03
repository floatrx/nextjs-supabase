'use server';

import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Get user
 * @tag server-action
 * @returns TUser
 */
export const getUser = authedProcedure.handler(async ({ ctx }) => {
  return ctx.supabase.auth.getUser().then(async ({ data }) => data.user);
});
