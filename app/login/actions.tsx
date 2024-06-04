'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
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
    console.log('Google login failed');
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
    console.log('Github login failed');
    return;
  }

  console.log('GIT', data);

  // Proceed to the URL provided by the OAuth provider
  redirect(data.url);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const { error } = await supabase.auth.signUp(credentials);
    if (error) {
      console.log('Signup failed');
      await login(formData);
    }
  } catch (e) {
    console.log(e);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
