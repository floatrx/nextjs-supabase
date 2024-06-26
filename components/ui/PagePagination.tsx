'use client';

import { Pagination, type PaginationProps } from '@nextui-org/pagination';
import { useQueryState, parseAsInteger } from 'nuqs';

interface IProps extends PaginationProps {}

export const PagePagination: RC<IProps> = (props) => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      clearOnDefault: true,
    }),
  );

  // Hide pagination if there is only one page
  if (props.total <= 1) return null;

  return <Pagination initialPage={Number(page) || 1} onChange={setPage} {...props} />;
};
