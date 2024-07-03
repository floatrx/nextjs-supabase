import type { TProfileWithRole } from '@/types/profile';
import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';
import type { TTagId, TTag } from '@/types/tag';

export type TPost = Tables<'posts'>;

export type TPostId = TPost['id'];

export type TPostExtended = TPost & {
  tags: {
    id: TTagId;
    tag: TTag | null;
  }[];
  author: TProfileWithRole | null;
};

export type TPostCreate = TablesInsert<'posts'>;

export type TPostUpdate = TablesUpdate<'posts'>;
