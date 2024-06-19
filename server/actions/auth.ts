/**
 * TODO: Move supabase queries into authService
 */
'use server';

import type { SignInWithOAuthCredentials } from '@supabase/auth-js';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { baseUrl } from '@/config';
import { createServerClient } from '@/lib/supabase/server';
import { authService } from '@/server/services/auth';
import { emailLoginSchema } from '@/validators/auth';

// Login with email
const authBase = async (action: 'signInWithPassword' | 'signUp', formData: FormData) => {
  const supabase = await createServerClient();

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

  const { error } = await supabase.auth[action](credentials);

  if (error) {
    redirect('/login?message=Invalid credentials');
  }

  revalidatePath('/', 'layout');
};

export const login = async (formData: FormData) => authBase('signInWithPassword', formData);
export const signup = async (formData: FormData) => authBase('signUp', formData);

// Login with OAuth providers
const oauthBase = async ({ options, ...credentials }: SignInWithOAuthCredentials) => {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
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
};
