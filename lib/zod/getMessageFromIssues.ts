import type { ZodIssue } from 'zod';

/**
 * Get message from zod issues
 * @param issues - ZodIssue[]
 */
export const getMessageFromIssues = (issues: ZodIssue[]): string => {
  return issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
};
