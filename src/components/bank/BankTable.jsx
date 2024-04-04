import { useIntl } from 'react-intl';
import { Table } from 'components/table';

export const BankTable = ({ data = [], isLoading = true }) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage({ id: 'components.bank.name' }),
      dataIndex: 'bank',
      render: ({ name, fullName }) => `${name} - ${fullName}`,
    },
    {
      title: intl.formatMessage({ id: 'components.bank.accountOwner' }),
      dataIndex: 'bankAccountOwner',
    },
    {
      title: intl.formatMessage({ id: 'components.bank.accountNumber' }),
      dataIndex: 'bankAccountNumber',
    },
    {
      title: intl.formatMessage({ id: 'components.bank.branch' }),
      dataIndex: 'bankBranch',
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={isLoading}
      scroll={{ x: 'max-content' }}
    />
  );
};
