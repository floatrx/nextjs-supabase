import type { Database } from '@/types/';

import { createBrowserClient as create } from '@supabase/ssr';

/**
 * @deprecated Use proxied `/api/endpoint` instead.
 * TODO: Delete this function after refactoring all components.
 */
export const createBrowserClient_Deprecated = () =>
  create<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
