import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

export type TTag = Tables<'tags'>;
export type TTagId = TTag['id'];
export type TTagCreate = TablesInsert<'tags'>;
export type TTagUpdate = TablesUpdate<'tags'>;
