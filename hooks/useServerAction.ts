import { useState } from 'react';

type AsyncFn = (...args: any) => Promise<any>;

/**
 * Use this hook to execute server actions in the client side
 * It will handle loading, error and data states...
 * @param action
 * @example
 *    export const DeleteButton = ({id}) => {
 *      const { loading, execute } = useServerAction(deleteNote);
 *      return (
 *        <Button isLoading={loading} onClick={() => execute(id)}>Delete</Button>
 *      );
 *    };
 */
export const useServerAction = <T extends AsyncFn>(action: T) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<Awaited<ReturnType<T>> | null>(null);

  const execute = async (...args: Parameters<T>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await action(...args);

      setResponse(res);

      return res as Awaited<ReturnType<T>>;
    } catch (e) {
      console.log('Error:', e.message);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    execute,
  };
};
