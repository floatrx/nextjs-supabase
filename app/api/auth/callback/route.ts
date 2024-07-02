'use server';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { exchangeCode } from '@/features/auth/actions/exchangeCode';

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
    const [res] = await exchangeCode(code);

    revalidatePath('/', 'layout');

    if (!res?.error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?message=no code`);
}
