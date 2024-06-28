import type { Tables } from '@/types/supabase';

export type TTag = Tables<'tags'>;
export type TTagId = TTag['id'];
