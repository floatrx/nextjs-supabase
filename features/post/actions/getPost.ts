'use server';

import { z } from 'zod';

import { authedProcedure } from '@/lib/zsa/authedProcedure';

/**
 * Get a post by ID or slug (base function)
 * Note: This function is not exported, use getPostById or getPostBySlug instead
 * @param column - Column to search by (id or slug)
 * @param eq - equal value to search for
 */
const getPost = authedProcedure
  .input(
    z.object({
      column: z.union([z.literal('id'), z.literal('slug')]),
      eq: z.union([z.string(), z.number()]).optional(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    const { column, eq } = input;

    if (!eq) {
      throw `${column} is required`;
    }

    const res = await ctx.supabase
      .from('posts')
      .select(
        `*,
        author: profiles (*, role: roles (*)),
        tags: post_tags (id:tag_id, tag: tags (id, name))
      `,
      )
      .eq(column, eq)
      .single();

    if (res.error) {
      throw res.error.message;
    }

    return res.data; // extract data from the response
  });

/**
 * Get a post by ID
 * @param id
 */
export const getPostById = (id?: number) => getPost({ column: 'id', eq: id });

/**
 * Get a post by slug
 * @param slug
 */
export const getPostBySlug = (slug?: string) => getPost({ column: 'slug', eq: slug });
