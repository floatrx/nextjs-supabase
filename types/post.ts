import type { Tables, TablesInsert, TablesUpdate } from '@/types/';

export type TPost = Tables<'posts'>;
export type TPostId = Pick<TPost, 'id'>;

export type TPostWithAuthor = TPost & {
  author:
    | (Tables<'profiles'> & {
        role: Tables<'roles'> | null;
      })
    | null;
};

export type TPostCreate = TablesInsert<'posts'>;
export type TPostUpdate = TablesUpdate<'posts'>;
