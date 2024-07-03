'use client';

import { Spinner } from '@nextui-org/spinner';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useTransition } from 'react';

interface IProps {
  defaultLimit: number;
  max: number;
}
export const LoadMoreButton: RC<IProps> = ({ defaultLimit, max }) => {
  const [isPending, startTransition] = useTransition();

  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(defaultLimit).withOptions({
      startTransition,
      clearOnDefault: true,
      shallow: false,
    }),
  );

  const handleLoadMore = () => {
    setLimit(limit + 2);
  };

  if (limit >= max) return null;

  return (
    <div className="stack justify-center py-4">
      <button className="btn btn-primary" disabled={isPending} onClick={handleLoadMore}>
        {isPending ? 'Loading...' : 'Load more'}
      </button>
      {isPending && (
        <div className="pointer-events-none fixed inset-0 z-50 flex touch-none items-center justify-center bg-background/20">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};
