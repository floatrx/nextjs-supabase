import { PostgrestSingleResponse, type PostgrestResponseFailure, type PostgrestResponseSuccess } from '@supabase/postgrest-js';

type PostgrestResponse<T = null> = PostgrestSingleResponse<T> | PostgrestResponseSuccess<T> | PostgrestResponseFailure;

export const formatPostgrestResponse = <T>(res: PostgrestResponse<T>) => {
  const { error, data, status, statusText } = res;

  const init = { status, statusText };

  if (error) return Response.json(error, init);

  return data ? Response.json(data, init) : new Response(null, init);
};

export const formatBadRequestResponse = (message: string) => {
  return Response.json({ message }, { status: 400 });
};
