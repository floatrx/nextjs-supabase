import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface RequestInitOptions<Payload> extends Omit<RequestInit, 'body'> {
  body?: Payload;
  tags?: string[];
}

/**
 * ✨ Use API hook
 * @param method - HTTP method (string)
 * @param url - API endpoint (/api/...)
 * @param tags - Cache tags[]
 * @param init - RequestInit options (compatible with fetch)
 */
export const useApi = <Payload, Result = null>(
  method: string = 'get',
  url: string,
  { tags, ...init }: RequestInitOptions<Payload> = {},
): [(payload: Payload) => Promise<{ result: Result | null; response: Response }>, boolean] => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const trigger = useCallback(
    async (payload: Payload) => {
      let body: string | FormData = JSON.stringify(payload); // stringify body by default

      if (payload instanceof FormData) {
        body = payload; // FormData is not stringifiable
      }

      setPending(true);

      const response = await fetch(`/api/${url}`, {
        method,
        next: { tags },
        ...init, // override default options
        body,
      });

      setPending(false);

      if (response.ok && response.status !== 204) {
        let result = await response.json();

        return { result, response };
      }

      router.refresh();

      return { result: null, response };
    },
    [url],
  );

  return [trigger, pending];
};
