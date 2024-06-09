import type { Tables, TablesInsert, TablesUpdate } from '@/types/';

export type TPost = Tables<'posts'>;

export type TPostWithAuthor = TPost & {
  author:
    | (Tables<'profiles'> & {
        role: Tables<'roles'> | null;
      })
    | null;
};

export type TPostInsert = TablesInsert<'posts'>;
export type TPostUpdate = TablesUpdate<'posts'>;
