'use server';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { authService } from '@/features/auth/services/auth';

/**
 * `auth/callback` route - handles the callback from the OAuth providers
 * NOTE: Tested with GitHub & Google OAuth
 * @returns redirect to the `next` URL or `/login` with an error message
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    console.log('code:', code);
    const { error } = await authService.exchangeCode(code);

    // revalidate the cache
    console.log('revalidating path:', '/');

    revalidatePath('/', 'layout');

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?message=no code`);
}
