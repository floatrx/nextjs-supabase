'use server';

import { z } from 'zod';

import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Search tags
 * @tag server-action
 */
export const searchTags = baseProcedure.input(z.union([z.string(), z.void()]).optional()).handler(async ({ ctx }) => {
  const res = await ctx.supabase.from('tags').select().order('id', { ascending: false });

  if (res.error) {
    throw res.error.message;
  }

  return res.data;
});
