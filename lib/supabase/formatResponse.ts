import type { FormState } from '@/types/form';
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
export const formatBadRequestResponse = (message: string) => {
  return Response.json({ statusText: message, status: 400, data: null }, { status: 400 });
};

/**
 * Format the response for invalid parse response
 */
export const formatInvalidParseResponse = <T>(parsed: SafeParseError<T>) => {
  return formatBadRequestResponse(`Invalid form data. Check issues ${getMessageFromIssues(parsed.error.issues)}`);
};

/**
 * Format the response status and statusText
 */
export const formatStatusResponse = <T = null>(res: AllResponses<T>): FormState<T> => {
  const { status = 500, statusText = 'Internal server error!' } = res;

  if (res instanceof Response) return { status, statusText, data: null };

  return { status, statusText, data: res.data };
};
