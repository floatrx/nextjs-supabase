import type { User } from '@supabase/auth-js/src/lib/types';
import type { Tables, TablesUpdate } from '@/types/supabase';

export type TUser = User;

export type TProfile = Tables<'profiles'>;

export type TProfileWithRole = TProfile & {
  role: Tables<'roles'> | null;
};

export type TProfileUpdate = TablesUpdate<'profiles'>;
