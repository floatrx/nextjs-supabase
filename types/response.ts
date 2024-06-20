import { PostgrestSingleResponse } from '@supabase/postgrest-js';

/**
 * Common server response type.
 *
 * Also uses for supabase response and
 * server-actions response
 */
export type SimpleResponse<T> = PostgrestSingleResponse<T> & {};
