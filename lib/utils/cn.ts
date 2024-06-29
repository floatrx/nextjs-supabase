import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS classnames utility
 * @param classNames
 */
export const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));
