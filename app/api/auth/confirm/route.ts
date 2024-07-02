import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

import { verifyOTP } from '@/features/auth/actions/verifyOTP';

/**
 * Confirm the email OTP and redirect the user to the next page
 * NOTE: Email/password login not tested, coz -> supabase limits on the free plan...
 * @returns redirect to the `next` URL or `/error` with an error message
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');

  if (token_hash && type) {
    const [data] = await verifyOTP({ type, token_hash });

    if (!data?.error) {
      redirectTo.searchParams.delete('next');

      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error';

  return NextResponse.redirect(redirectTo);
}
