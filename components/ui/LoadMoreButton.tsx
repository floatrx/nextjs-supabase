'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useTransition } from 'react';

import { Spinner } from '@heroui/spinner';

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

  const handleLoadMore = async () => {
    await setLimit(limit + 2);
  };

  if (limit >= max) return null;

  return (
    <div className="stack justify-center py-4">
      <button className="btn btn-primary" disabled={isPending} onClick={handleLoadMore}>
        {isPending ? 'Loading...' : 'Load more'}
      </button>
      {isPending && (
        <div className="bg-background/20 pointer-events-none fixed inset-0 z-50 flex touch-none items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};
