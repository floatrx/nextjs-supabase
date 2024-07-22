import type { Database } from '@/types/supabase';

import { createServerClient as create } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { SUPABASE_KEY, SUPABASE_URL } from '@/config/const';

/**
 * TODO: Research best practices to create
 *  a Supabase client for server-side rendering.
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export function createServerClient() {
  const cookieStore = cookies();

  return create<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
