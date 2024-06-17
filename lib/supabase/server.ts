'use server';

import type { Database } from '@/types/';

import { type CookieOptions, createServerClient as create } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { SUPABASE_KEY, SUPABASE_URL } from '@/const';

/**
 * TODO: Research best practices to create
 *  a Supabase client for server-side rendering.
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export const createServerClient = async () => {
  const cookieStore = cookies();

  return create<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.delete({ name, ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
