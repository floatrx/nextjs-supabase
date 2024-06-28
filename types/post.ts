import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';
import type { TTagId } from '@/types/tag';

export type TPost = Tables<'posts'>;

export type TPostId = TPost['id'];

export type TPostWithAuthor = TPost & {
  tags: {
    id: TTagId;
    tag: Tables<'tags'> | null;
  }[];
  author:
    | (Tables<'profiles'> & {
        role: Tables<'roles'> | null;
      })
    | null;
};

export type TPostCreate = TablesInsert<'posts'>;

export type TPostUpdate = TablesUpdate<'posts'>;

export interface PostSearchParams {
  title?: string | null;
  page?: number;
  limit?: number;
}
