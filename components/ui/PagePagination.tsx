'use client';

import { Pagination, type PaginationProps } from '@nextui-org/pagination';

import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps extends PaginationProps {}

export const PagePagination: RC<IProps> = (props) => {
  const [page, setPage] = useSearchParamState('page');

  // Hide pagination if there is only one page
  if (props.total <= 1) return null;

  return <Pagination initialPage={Number(page) || 1} onChange={(page) => setPage(String(page))} {...props} />;
};
