// TODO: Replace hard-coded URLs with environment variables!
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { emailLoginSchema } from '@/validators';

async function auth(action: 'signInWithPassword' | 'signUp', formData: FormData) {
  const supabase = await createClient();

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
  redirect('/notes');
}

export async function login(formData: FormData) {
  return auth('signInWithPassword', formData);
}

export async function signup(formData: FormData) {
  return auth('signUp', formData);
}

export async function googleLogin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'email profile',
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.error('Google login failed');

    return;
  }

  // Proceed to the URL provided by the OAuth provider
  redirect(data.url);
}

export async function githubLogin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.error('Github login failed');

    return;
  }

  // Proceed to the URL provided by the OAuth provider
  redirect(data.url);
}
