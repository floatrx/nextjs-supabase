import { z } from 'zod';

const EmailOtpTypeSchema = z.enum(['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'email']);

const BaseSchema = z.object({
  type: EmailOtpTypeSchema,
});

const VerifyEmailOtpParamsSchema = BaseSchema.extend({
  token: z.string(),
  email: z.string(),
});

const VerifyTokenHashParamsSchema = BaseSchema.extend({
  token_hash: z.string(),
});

export const VerifyOTPSchema = z.union([VerifyEmailOtpParamsSchema, VerifyTokenHashParamsSchema]);
