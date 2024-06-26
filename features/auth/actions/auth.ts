/**
 * TODO: Move supabase queries into authService
 */
'use server';

import type { SignInWithOAuthCredentials } from '@supabase/auth-js';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { baseUrl } from '@/config';
import { authService } from '@/features/auth/services/auth';
import { emailLoginSchema } from '@/features/auth/validators/emailLoginSchema';
import { AuthServiceViaEmailAction } from '@/types/auth';

// Login with email
const authBase = async (action: AuthServiceViaEmailAction, formData: FormData) => {
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    // Validate the credentials object
    const isValidCredentials = emailLoginSchema.parse(credentials);

    if (!isValidCredentials) {
      throw new Error('Invalid credentials');
    }
  } catch (e) {
    redirect('/login?message=Invalid credentials');
  }

  const { error } = await authService.viaEmail(action, credentials);

  if (error) {
    redirect('/login?message=Invalid credentials');
  }

  if (action === 'signUp') {
    redirect('/login?message=Check your email for a verification link');
  }

  revalidatePath('/', 'layout');
};

export const login = async (formData: FormData) => authBase(AuthServiceViaEmailAction.SignIn, formData);
export const signup = async (formData: FormData) => authBase(AuthServiceViaEmailAction.SignUp, formData);

// Login with OAuth providers
const oauthBase = async ({ options, ...credentials }: SignInWithOAuthCredentials) => {
  const { data, error } = await authService.signInWithOAuth({
    ...credentials,
    options: {
      ...options,
      redirectTo: `${baseUrl}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(`${credentials.provider} login failed`);

    return;
  }

  // Proceed to the URL provided by the OAuth provider
  redirect(data.url);
};

export const googleLogin = async () => {
  return oauthBase({
    provider: 'google',
    options: {
      scopes: 'email profile',
    },
  });
};

export const githubLogin = async () => {
  return oauthBase({
    provider: 'github',
  });
};

export const signOut = async () => {
  await authService.signOut();
  revalidatePath('/', 'layout');
};
