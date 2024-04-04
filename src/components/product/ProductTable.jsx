import { useIntl } from 'react-intl';
import { Table } from 'components/table';
import { StyledSpace, StyledTypographyText } from 'styles/overrides';
import { formatCurrency } from 'utils/formatUtils';

export const ProductTable = ({
  dataSource = [],
  totalPrice,
  currency,
  isFixedWidth = false,
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage({ id: 'common.table.no' }),
      render: (text, record, index) => index + 1,
      width: isFixedWidth ? 60 : '',
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'productCode',
      width: isFixedWidth ? 80 : undefined,
    },
    {
      title: intl.formatMessage({ id: 'components.product.description' }),
      dataIndex: 'productName',
      width: isFixedWidth ? 200 : undefined,
    },
    {
      title: intl.formatMessage({ id: 'components.product.quantity' }),
      dataIndex: 'quantity',
      width: isFixedWidth ? 60 : undefined,
    },
    {
      title: intl.formatMessage({ id: 'components.product.price' }),
      dataIndex: 'price',
      render: (value) => formatCurrency(value),
    },
    {
      title: intl.formatMessage({ id: 'components.product.total' }),
      dataIndex: 'subTotal',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <Table
      rowKey="productId"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ x: 'max-content' }}
      footer={() => (
        <StyledSpace
        // size={64}
        // style={{
        //   justifyContent: 'flex-end',
        //   paddingRight: 100,
        // }}
        >
          <StyledTypographyText
            style={{ fontSize: 18, color: 'var(--gray700)' }}
          >
            {intl.formatMessage({ id: 'components.product.totalPrice' })}:
          </StyledTypographyText>
          <StyledTypographyText
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray900)' }}
          >
            {formatCurrency(totalPrice)} {currency}
          </StyledTypographyText>
        </StyledSpace>
      )}
    />
  );
};
