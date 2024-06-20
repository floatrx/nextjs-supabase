import type { SafeParseError } from 'zod';

import { PostgrestSingleResponse, type PostgrestResponseFailure, type PostgrestResponseSuccess } from '@supabase/postgrest-js';

import { getMessageFromIssues } from '@/lib/zod';

type PostgrestResponse<T = null> = PostgrestSingleResponse<T> | PostgrestResponseSuccess<T> | PostgrestResponseFailure;
type AllResponses<T> = PostgrestResponse<T> | Response;

/**
 * Format the response for postgrest query result
 */
export const formatPostgrestResponse = <T>(res: AllResponses<T>) => {
  if (res instanceof Response) return res; // just pass through

  const { error, data, status, statusText } = res;

  const init = { status, statusText };

  if (error) return Response.json(error, init);

  return data ? Response.json(data, init) : new Response(null, init);
};

/**
 * Format the response for bad request
 */
export const formatResponse = <T>(message: string, status: number = 400, data: T | null = null) => {
  return Response.json({ statusText: message, status, data }, { status });
};

/**
 * Format the response for invalid parse response
 * using zod error issues
 */
export const formatInvalidParseResponse = <T>(parsed: SafeParseError<T>) => {
  return formatResponse(`Invalid form data. Check issues ${getMessageFromIssues(parsed.error.issues)}`);
};

/**
 * Format the response status and statusText with error
 * - PostgrestResponse
 * - Response
 * @param res - any PostgrestResponse or Response
 */
export const formatFormActionResponse = <T>(res: AllResponses<T>) => {
  const { status = 500, statusText = 'Internal server error!' } = res; // defaults...

  // default Response
  if (res instanceof Response)
    return {
      status,
      statusText,
      data: null,
    };

  // Postgrest response
  return res;
};

/**
 * Format Supabase response error
 * NOTE: This wrapper uses `formatStatusResponse` and extend
 *  Use `formatInvalidParseResponse` with `zod` schema validation errors.
 * @param message - error text message
 * @param status - error status code (default: 400)
 */
export const formatStatusErrorResponse = (message: string, status: number = 400) => {
  return formatFormActionResponse(new Response(null, { status, statusText: message }));
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
