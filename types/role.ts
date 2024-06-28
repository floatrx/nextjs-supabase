import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

export type TRole = Tables<'roles'>;
export type TRoleCreate = TablesInsert<'roles'>;
export type TRoleUpdate = TablesUpdate<'roles'>;
