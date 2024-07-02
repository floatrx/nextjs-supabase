import { ZodError } from 'zod';

import { getMessageFromIssues } from '@/lib/zod/getMessageFromIssues';

/**
 * Get message from zod error
 * @param error - ZodError
 */
export const getMessageFromZodError = (error: ZodError): string => getMessageFromIssues(error.issues);
