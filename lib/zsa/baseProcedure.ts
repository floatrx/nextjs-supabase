import { createServerActionProcedure } from 'zsa';

import { createServerClient } from '@/lib/supabase/server';

export const baseProcedure = createServerActionProcedure()
  .handler(async () => {
    const supabase = await createServerClient();

    return { supabase };
  })
  .createServerAction();
