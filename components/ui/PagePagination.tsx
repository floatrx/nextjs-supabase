'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useTransition } from 'react';

import { Pagination, type PaginationProps } from '@heroui/pagination';
import { Spinner } from '@heroui/spinner';

type IProps = PaginationProps;

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
        <div className="bg-background/20 pointer-events-none fixed inset-0 z-50 flex touch-none items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};
