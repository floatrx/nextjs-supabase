import type { Tables, TablesUpdate } from '@/types/supabase';

export type TProfile = Tables<'profiles'>;

export type TProfileWithRole = TProfile & {
  role: Tables<'roles'> | null;
};

export type TProfileUpdate = TablesUpdate<'profiles'>;
