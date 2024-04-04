import { SaleRankReportFilter } from './SaleRankReportFilter';
import { SaleRankReportTable } from './SaleRankReportTable';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { useSaleRank } from 'api/reportApi';

export const SaleRankReport = () => {
  const [search, setSearch] = useCustomSearchParams();
  const { data: { years = [], result = [] } = {}, isLoading } = useSaleRank({
    params: search,
  });

  return (
    <>
      <SaleRankReportFilter
        years={years}
        onSubmit={(values) => setSearch(values)}
        initialValues={{
          yearSaleRank: search.yearSaleRank ?? new Date().getFullYear(),
        }}
      />

      <SaleRankReportTable
        dataSource={result}
        isLoading={isLoading}
        years={years}
      />
    </>
  );
};
