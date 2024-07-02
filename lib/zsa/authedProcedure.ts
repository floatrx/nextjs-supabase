import { createServerActionProcedure } from 'zsa';

import { createServerClient } from '@/lib/supabase/server';

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    const supabase = await createServerClient();

    try {
      const user = supabase.auth.getUser();

      return { user, supabase };
    } catch (e) {
      throw new Error('Not authorized');
    }
  })
  .createServerAction();
