import { createServerClient } from '@/lib/supabase/server';

/**
 * Auth service
 */
export const authService = {
  async signOut() {
    const supabase = await createServerClient();

    return supabase.auth.signOut();
  },
};
