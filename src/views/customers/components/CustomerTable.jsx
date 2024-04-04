/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Table } from 'components/table';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { calcIndexByOrder, removeFalsyKeys, formatAddress } from 'utils';
import { StyledActions, StyledButton } from 'styles/overrides';
import { useCustomers, useImportCustomer } from 'api/customerApi';
import { CustomerModal } from './CustomerModal';
import { CustomerFilterSearchForm } from './CustomerFilterSearchForm';
import { AddressList } from 'components/address/AddressList';
import { Upload } from 'components/upload';

export const CustomerTable = () => {
  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const {
    data: customer,
    isLoading,
    refetch,
  } = useCustomers({ params: search });
  const importCustomerMutation = useImportCustomer();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const columns = [
    {
      title: intl.formatMessage({ id: 'common.table.no' }),
      render: (text, record, index) => {
        return calcIndexByOrder({
          index,
          page: search.page,
          limit: search.limit,
        });
      },
    },
    {
      title: intl.formatMessage({ id: 'views.customers.table.fullName' }),
      dataIndex: 'fullName',
    },
    {
      title: intl.formatMessage({ id: 'views.customers.table.phone' }),
      dataIndex: 'phone',
    },
    {
      title: intl.formatMessage({ id: 'views.customers.table.address' }),
      render: ({ defaultAddressId, customerAddresses }) => {
        return (
          <AddressList
            addresses={customerAddresses}
            defaultAddressId={defaultAddressId}
          />
        );
      },
    },
  ];

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  const handleClickEdit = () => {
    if (selectedRows.length !== 1) {
      return;
    }

    setIsOpenModal(true);
    setSelectedValue(selectedRows[0]);
  };

  return (
    <>
      <CustomerFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={search}
      />

      <StyledActions size={24}>
        <Upload mutation={importCustomerMutation} onSuccess={refetch} />

        <StyledButton
          size="large"
          type="primary"
          onClick={() => setIsOpenModal(true)}
        >
          {intl.formatMessage({ id: 'common.btn.addNew' })}
        </StyledButton>

        <StyledButton
          size="large"
          disabled={selectedRows.length !== 1}
          onClick={handleClickEdit}
        >
          {intl.formatMessage({ id: 'common.btn.edit' })}
        </StyledButton>
      </StyledActions>

      <Table
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys, newSelectedRows) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRows(newSelectedRows);
          },
          preserveSelectedRowKeys: true,
        }}
        columns={columns}
        dataSource={customer?.items || []}
        loading={isLoading}
        pagination={{
          current: search?.page,
          pageSize: search?.limit,
          total: customer?.total || 0,
        }}
        onChange={handleChangeTable}
      />

      <CustomerModal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setSelectedValue(null);
        }}
        onSuccess={() => {
          setIsOpenModal(false);
          refetch();
          setSelectedValue(null);
          setSelectedRowKeys([]);
          setSelectedRows([]);
        }}
        initialValues={selectedValue}
      />
    </>
  );
};
