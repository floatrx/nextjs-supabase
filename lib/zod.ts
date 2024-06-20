/**
 * ✨Zod helpers and utilities
 */

import type { ZodIssue } from 'zod';

/**
 * Get message from zod issues
 * @param issues
 */
export const getMessageFromIssues = (issues: ZodIssue[]): string => {
  return issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
};
