import { PostgrestSingleResponse } from '@supabase/postgrest-js';

/**
 * Format the response for bad request
 */
export const formatResponse = <T>(message: string, status: number = 400, data: T | null = null) => {
  return Response.json({ statusText: message, status, data }, { status });
};

/**
 * Calculate the total pages count and extend the response
 * @param res - PostgrestSingleResponse (array)
 * @param limit - number of items per page
 */
export const formatResultWithPagesCount = <T>(
  res: PostgrestSingleResponse<T[]>,
  limit: number,
): PostgrestSingleResponse<T[]> & { total: number } => {
  const total = Math.ceil((res.count ?? 1) / limit);

  return { ...res, total };
};
