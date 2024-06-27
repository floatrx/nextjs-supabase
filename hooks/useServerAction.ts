import { useState } from 'react';

type AsyncFn = (...args: any) => Promise<any>;

export const useServerAction = <T extends AsyncFn>(action: T) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

  const execute = async (...args: Parameters<T>) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await action(...args);

      setData(res);

      return res as Awaited<ReturnType<T>>;
    } catch (e) {
      console.log('Error:', e.message);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    execute,
  };
};
