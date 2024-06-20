import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

/**
 * This hook is used to manage search params in the URL
 * @param key - search param key (e.g. 'search', 'tab', etc.)
 * @param initialValue
 */
export const useSearchParamState = (key: string, initialValue: string = ''): [string, (val: string) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get(key) ?? initialValue);

  const updateValue = useDebounce((newValue: string) => {
    const qs = new URLSearchParams(searchParams);

    // Remove key if value is the same as initial value
    if (newValue === initialValue) {
      qs.delete(key);
    } else {
      qs.set(key, newValue);
    }

    console.log(`[useSearchParamState] key: "${key}": ${newValue}`);

    setValue(newValue);
    router.replace(`${pathname}?${qs.toString()}`);
  });

  return [value, updateValue];
};
