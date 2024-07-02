import { ExchangeCodeSchema } from '@/features/auth/actions/validators/exchangeCodeSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

export const exchangeCode = baseProcedure.input(ExchangeCodeSchema).handler(({ ctx, input }) => {
  return ctx.supabase.auth.exchangeCodeForSession(input);
});
