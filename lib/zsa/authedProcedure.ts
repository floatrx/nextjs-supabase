import { createServerActionProcedure, ZSAError } from 'zsa';

import { createServerClient } from '@/lib/supabase/server';

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    const supabase = await createServerClient();

    try {
      const user = supabase.auth.getUser();

      return { user, supabase };
    } catch (e) {
      throw new ZSAError('NOT_AUTHORIZED', 'You are not authorized to perform this action');
    }
  })
  .createServerAction();
