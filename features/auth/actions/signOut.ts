'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Sign out
 * @tag server-action
 */
export const signOut = authedProcedure
  .input(z.any(), { type: 'formData' })
  .onSuccess(() => revalidatePath('/', 'layout'))
  .handler(async ({ ctx }) => {
    await ctx.supabase.auth.signOut();

    redirect('/login');
  });
