import type { Tables, TablesUpdate } from '@/types/supabase';

export type TProfile = Tables<'profiles'> & {
  role: Tables<'roles'> | null;
};

export type TProfileWithRole = TProfile & {
  role: Tables<'roles'> | null;
};

export type TRoleUpdate = TablesUpdate<'profiles'>;
