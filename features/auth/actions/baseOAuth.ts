'use server';

import type { SignInWithOAuthCredentials } from '@supabase/auth-js';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { baseUrl } from '@/config';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Base OAuth procedure for Google and GitHub login
 * @param options - OAuth options (scopes etc.)
 * @param credentials - OAuth credentials (provider)
 * @see https://supabase.com/docs/reference/javascript/auth-signinwithoauth
 */
const baseOAuthProcedure = ({ options, ...credentials }: SignInWithOAuthCredentials) => {
  return baseProcedure
    .input(z.any(), { type: 'formData' })
    .output(z.void())
    .onSuccess(() => revalidatePath('/', 'layout'))
    .handler(async ({ ctx }): Promise<void> => {
      const { data, error } = await ctx.supabase.auth.signInWithOAuth({
        ...credentials,
        options: {
          ...options,
          redirectTo: `${baseUrl}/api/auth/callback`,
        },
      });

      // Expose error
      if (error) {
        throw error.message;
      }

      // Proceed to the URL provided by the OAuth provider
      redirect(data.url);
    });
};

/**
 * Google login
 * @tag server-action
 */
export const googleLogin = baseOAuthProcedure({
  provider: 'google',
  options: {
    scopes: 'email profile',
  },
});

/**
 * GitHub login
 * @tag server-action
 */
export const githubLogin = baseOAuthProcedure({
  provider: 'github',
});
