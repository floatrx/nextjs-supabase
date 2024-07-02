'use server';

import { VerifyOTPSchema } from '@/features/auth/actions/validators/verifyOTPSchema';
import { baseProcedure } from '@/lib/zsa/baseProcedure';

export const verifyOTP = baseProcedure.input(VerifyOTPSchema).handler(async ({ ctx, input }) => {
  return ctx.supabase.auth.verifyOtp(input);
});
