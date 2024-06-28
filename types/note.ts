import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

export type TNote = Tables<'notes'>;
export type TNoteCreate = TablesInsert<'notes'>;
export type TNoteUpdate = TablesUpdate<'notes'>;
