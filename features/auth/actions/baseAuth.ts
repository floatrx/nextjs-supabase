'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { githubLogin, googleLogin } from '@/features/auth/actions/baseOAuth';
import { EmailLoginSchema } from '@/features/auth/actions/validators/emailLoginSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';
import { EAuthServiceViaEmailAction } from '@/types/auth';

export type AuthActionFn = typeof login | typeof signup | typeof googleLogin | typeof githubLogin;

/**
 * Base OAuth procedure for Google and GitHub login
 * @param action - Auth action (login or signup)
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
        throw new Error(error.message);
      }
    });
};

export const login = baseAuthProcedure(EAuthServiceViaEmailAction.SignIn);
export const signup = baseAuthProcedure(EAuthServiceViaEmailAction.SignUp);
