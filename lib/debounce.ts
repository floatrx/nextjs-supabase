import { DEFAULT_DEBOUNCE_DELAY } from '@/config/const';

/**
 * Debounce function
 * @param fn - function to debounce
 * @param delay - delay in milliseconds
 * @returns debounced function
 */
export const debounce = <T extends AnyFn>(
  fn: T,
  delay: number = DEFAULT_DEBOUNCE_DELAY,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
