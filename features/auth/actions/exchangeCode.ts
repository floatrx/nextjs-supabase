import { ExchangeCodeSchema } from '@/features/auth/actions/validators/exchangeCodeSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

/**
 * Exchange OAuth code for session
 * @tag server-action
 * @see https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession
 */
export const exchangeCode = baseProcedure.input(ExchangeCodeSchema).handler(({ ctx, input }) => {
  return ctx.supabase.auth.exchangeCodeForSession(input);
});
