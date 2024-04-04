import { useIntl } from 'react-intl';
import _ from 'lodash';
import { Table } from 'components/table';
import { formatCurrency } from 'utils/formatUtils';

export const SaleRankReportTable = ({
  isLoading,
  dataSource = [],
  years = [],
}) => {
  const intl = useIntl();

  const yearColumns = _.chain(years)
    .map((year) => ({
      title: year,
      dataIndex: year,
      render: (value) => formatCurrency(value),
    }))
    .reverse()
    .value();

  const columns = [
    {
      title: intl.formatMessage({ id: 'views.dashboard.table.productCode' }),
      dataIndex: 'productCode',
    },
    {
      title: intl.formatMessage({ id: 'views.dashboard.table.productName' }),
      dataIndex: 'productName',
    },
    {
      title: intl.formatMessage({ id: 'views.dashboard.table.sales' }),
      dataIndex: 'total',
      render: (value) => formatCurrency(value),
    },
    ...yearColumns,
  ];

  return (
    <Table
      rowKey="productId"
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={false}
    />
  );
};
