'use client';

import { Pagination, type PaginationProps } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useTransition } from 'react';

interface IProps extends PaginationProps {}

export const PagePagination: RC<IProps> = (props) => {
  const [isPending, startTransition] = useTransition();

  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      startTransition,
      clearOnDefault: true,
      shallow: false,
    }),
  );

  // Hide pagination if there is only one page
  if (props.total <= 1) return null;

  return (
    <div className="stack justify-center py-4">
      <Pagination
        color="primary"
        initialPage={Number(page) || 1}
        size="lg"
        variant="flat"
        onChange={setPage}
        {...props}
      />
      {isPending && (
        <div className="pointer-events-none fixed inset-0 z-50 flex touch-none items-center justify-center bg-background/20">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};
