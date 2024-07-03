import type { Tables, TablesUpdate } from '@/types/supabase';
import type { User } from '@supabase/auth-js/src/lib/types';

export type TUser = User;

export type TProfile = Tables<'profiles'>;

export type TProfileWithRole = TProfile & {
  role: Tables<'roles'> | null;
};

export type TProfileUpdate = TablesUpdate<'profiles'>;
