import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { searchParams, pathname, origin } = request.nextUrl;

  // Handle OAuth PKCE code at root - redirect to callback handler
  if (pathname === '/' && searchParams.has('code')) {
    const code = searchParams.get('code');
    return NextResponse.redirect(`${origin}/api/auth/callback?code=${code}`);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
