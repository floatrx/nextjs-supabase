import { cookies } from 'next/headers';
import { SUPABASE_KEY, SUPABASE_URL } from '@/const';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/schema';

/**
 * TODO: Research best practices to create
 *  a Supabase client for server-side rendering.
 */
export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
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
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

export const supabase = createClient();
