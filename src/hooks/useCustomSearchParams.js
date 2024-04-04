import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGINATION } from 'constants/common';

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const transformedSearchParams = useMemo(() => {
    const searchParamsAsObject = Object.fromEntries(
      new URLSearchParams(searchParams),
    );

    return {
      ...searchParamsAsObject,
      page: +searchParamsAsObject.page || DEFAULT_PAGINATION.PAGE,
      limit: +searchParamsAsObject.limit || DEFAULT_PAGINATION.LIMIT,
    };
  }, [searchParams]);

  return [transformedSearchParams, setSearchParams];
};
