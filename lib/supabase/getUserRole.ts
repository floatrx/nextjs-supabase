import type { User } from '@supabase/supabase-js';
import type { RoleId } from '@/lib/rbac/permissions';

import { createServerClient } from '@/lib/supabase/server';

interface UserWithRole {
  user: User | null;
  role: RoleId | undefined;
}

/**
 * Get current user and their role from the database
 * Returns null user if not authenticated
 */
export async function getUserWithRole(): Promise<UserWithRole> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: undefined };

  const { data: profile } = await supabase.from('profiles').select('id_role').eq('id', user.id).single();

  return { user, role: profile?.id_role as RoleId | undefined };
}
