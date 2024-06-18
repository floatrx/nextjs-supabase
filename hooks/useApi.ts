import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTransition } from 'react';

interface Options<Payload> extends Omit<RequestInit, 'body'> {
  body?: Payload;
  tags?: string[];
}

/**
 * Use API hook
 * @param method - HTTP method (string)
 * @param url - API endpoint (/api/...)
 * @param tags - Cache tags[]
 * @param init - RequestInit options (compatible with fetch)
 */
export const useApi = <Payload>(
  method: string = 'get',
  url: string,
  { tags, ...init }: Options<Payload> = {},
): [(payload: Payload) => void, boolean] => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const trigger = useCallback(
    (payload: Payload) => {
      startTransition(async () => {
        await fetch(`/api/${url}`, {
          method,
          next: { tags },
          ...init, // override default options
          body: JSON.stringify(payload), // always stringify body
        });
        router.refresh();
      });
    },
    [url],
  );

  return [trigger, pending];
};
