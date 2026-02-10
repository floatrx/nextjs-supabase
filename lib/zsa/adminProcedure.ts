import { createServerActionProcedure, ZSAError } from 'zsa';

import { createServerClient } from '@/lib/supabase/server';

/**
 * Admin procedure - only allows users with admin role (id_role = 1)
 */
export const adminProcedure = createServerActionProcedure()
  .handler(async () => {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new ZSAError('NOT_AUTHORIZED', 'You must be logged in');
    }

    // Check if user is admin
    const { data: profile } = await supabase.from('profiles').select('id_role').eq('id', user.id).single();

    if (!profile || profile.id_role !== 1) {
      throw new ZSAError('NOT_AUTHORIZED', 'Admin access required');
    }

    return { user, supabase };
  })
  .createServerAction();
