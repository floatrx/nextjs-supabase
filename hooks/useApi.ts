import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTransition } from 'react';

interface Options<T> extends Omit<RequestInit, 'body'> {
  body?: T;
}

type UseApi = <T>(url: string, options: Options<T>) => [(payload: T) => void, boolean];

export const useApi: UseApi = <T>(url: string, { method = 'POST' }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const trigger = useCallback(
    (payload: T) => {
      startTransition(async () => {
        await fetch(`/api/${url}`, {
          method,
          body: JSON.stringify(payload),
        });
        router.refresh();
      });
    },
    [method, url],
  );

  return [trigger, pending];
};
