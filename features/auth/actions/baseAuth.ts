'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { githubLogin, googleLogin } from '@/features/auth/actions/baseOAuth';
import { EmailLoginSchema } from '@/features/auth/actions/validators/emailLoginSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';
import { EAuthServiceViaEmailAction } from '@/types/auth';

export type AuthActionFn = typeof login | typeof signup | typeof googleLogin | typeof githubLogin;

/**
 * Base OAuth procedure for `Google` and `GitHub` login actions
 * @param action - Auth action (login or signup)
 * @see https://supabase.com/docs/guides/auth/passwords
 */
const baseAuthProcedure = (action: EAuthServiceViaEmailAction) => {
  return baseProcedure
    .input(EmailLoginSchema, { type: 'formData' })
    .output(z.void())
    .onSuccess(() => revalidatePath('/', 'layout'))
    .handler(async ({ ctx, input }) => {
      const { error } = await ctx.supabase.auth[action](input);

      // Expose error
      if (error) {
        throw error.message;
      }
    });
};

/**
 * Email login
 * @tag server-action
 */
export const login = baseAuthProcedure(EAuthServiceViaEmailAction.SignIn);

/**
 * Email signup
 * @tag server-action
 */
export const signup = baseAuthProcedure(EAuthServiceViaEmailAction.SignUp);
