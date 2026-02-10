/**
 * ZSA Fetcher adapter for SWR
 * NOTE: Pure ZSA handler function is incompatible as SWR fetcher
 * @param fn
 * @tags wrapper, zsa, swr
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const zsaFetcher = <T>(fn: (...args: any[]) => Promise<[T | null, Error | null]>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]): Promise<T> => {
    const [data, error] = await fn(...args);

    if (error) throw error.message;

    return data as T;
  };
};
