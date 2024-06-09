import type { ZodIssue } from 'zod';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind CSS classnames utility
export const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));

export const upperFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const getExcerpt = (content: string, length: number = 300): string => {
  return content.length > length ? content.slice(0, length) + '…' : content;
};

export const createSlug = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w\d\s-]/g, '');
};

export const getMessageFromIssues = (issues: ZodIssue[]): string => {
  return issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
};
