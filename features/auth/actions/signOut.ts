'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Sign out
 * @tag server-action
 */
export const signOut = authedProcedure
  .onSuccess(() => {
    revalidatePath('/', 'layout');
    redirect('/login');
  })
  .handler(async ({ ctx }) => {
    await ctx.supabase.auth.signOut();
  });
