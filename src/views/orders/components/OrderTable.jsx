/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Table } from 'components/table';
import { OrderStatus, SmsStatus } from 'components/status';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import {
  calcIndexByOrder,
  removeFalsyKeys,
  formatTime,
  formatAddress,
  formatCurrency,
} from 'utils';
import { StyledActions, StyledButton } from 'styles/overrides';
import {
  useOrders,
  useImportOrder,
  useDownloadCsvTemplate,
  useExportExcel,
  useUpdateOrderPayment,
  useUpdateNoteAdmin,
} from 'api/orderApi';
import { OrderFormDrawer } from './OrderFormDrawer';
import { OrderFilterSearchForm } from './OrderFilterSearchForm';
import { Upload } from 'components/upload';
import { DownloadTemplate } from 'components/download-template/DownloadTemplate';
import { ExportExcel } from 'components/export/ExportExcel';
import { ResendSMS } from './ResendSMS';
import { Input } from 'antd';
import { Notification } from 'components';

export const OrderTable = () => {
  const intl = useIntl();
  const useCustomSearchParams_2 = () => {
    const search_2 = useCustomSearchParams();
    const order_limit = 100;
    search_2.limit = order_limit;
    search_2[0].limit = order_limit;
    console.log('search_2', search_2);
    return search_2;
  };
  const [search, setSearch] = useCustomSearchParams_2();
  const { data: product, isLoading, refetch } = useOrders({ params: search });
  const importOrderMutation = useImportOrder();
  const downloadCsvTemplateMutation = useDownloadCsvTemplate();
  const exportExcelMutation = useExportExcel(search);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
      title: intl.formatMessage({ id: 'views.orders.table.code' }),
      className: 'withColor',
      render: ({ id, code }) => <Link to={`${id}`}>{code}</Link>,
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.confirmPayment' }),
      className: 'withColor',
      render: ({ id, payment_status }) => {
        let flag = payment_status === 'paid';

        return flag ? (
          <div>
            {intl.formatMessage({ id: 'views.orders.table.true' })}
            <span></span>
            <StyledButton
              onClick={() => handleUpdatePaymentStatus(id, 'pending')}
            >
              {intl.formatMessage({ id: 'views.orders.table.deny' })}
            </StyledButton>
          </div>
        ) : (
          <StyledButton onClick={() => handleUpdatePaymentStatus(id, 'paid')}>
            {intl.formatMessage({ id: 'views.orders.table.confirm' })}
          </StyledButton>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.fullName' }),
      dataIndex: ['orderAddress', 'fullName'],
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.phone' }),
      dataIndex: ['orderAddress', 'phone'],
    },
    {
      title: intl.formatMessage({ id: 'common.table.livestreamDate' }),
      dataIndex: 'livestreamDate',
      render: (value) => formatTime(value),
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.address' }),
      dataIndex: 'orderAddress',
      render: (value) => formatAddress(value),
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.productPrice' }),
      dataIndex: 'subTotal',
      render: (value) => formatCurrency(value),
    },
    {
      title: intl.formatMessage({ id: 'common.table.status' }),
      dataIndex: 'status',
      render: (value) => <OrderStatus status={value} />,
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.smsStatus' }),
      dataIndex: 'sms_status',
      render: (value) => <SmsStatus status={value} />,
    },
    {
      title: intl.formatMessage({ id: 'views.orders.table.noteAdmin' }),
      dataIndex: 'noteAdmin',
      render: (value, record) => {
        return (
          <Input
            type="text"
            defaultValue={value}
            onPressEnter={(e) => handleInputNoteAdmin(e, record.id)}
          />
        );
      },
    },
  ];

  const updateOrderStatusMutation = useUpdateOrderPayment();
  const updateOrderNoteAdmin = useUpdateNoteAdmin();

  const handleUpdatePaymentStatus = (id, status) => {
    console.log('handleUpdatePaymentStatus - id', id);
    updateOrderStatusMutation.mutate(
      {
        order_id: id,
        payment_status: status,
      },
      {
        onSuccess() {
          refetch();
        },
        onError() {},
      },
    );

    // deleteUserMutation.mutate(userId, {
    //   onSuccess() {
    //     const calculatedPage = calcCurrentPageWithNum({
    //       page: search.page,
    //       limit: search.limit,
    //       total: data?.total,
    //     });

    //     if (calculatedPage !== search.page) {
    //       setSearch(
    //         removeFalsyKeys({
    //           ...search,
    //           page: calculatedPage,
    //         }),
    //       );
    //     } else {
    //       refetch();
    //     }
    //   },
    //   onError(error) {
    //     Notification(
    //       'error',
    //       error?.message || intl.formatMessage({ id: 'message.commonError' }),
    //     );
    //   },
    // });
  };

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleInputNoteAdmin = (e, id) => {
    updateOrderNoteAdmin.mutate(
      {
        order_id: id,
        noteAdmin: e.target.value,
      },
      {
        onSuccess() {
          refetch();
          Notification(
            'success',
            intl.formatMessage({ id: 'message.noteAdminSuccess' }),
          );
        },
        onError() {
          Notification(
            'error',
            intl.formatMessage({ id: 'message.commonError' }),
          );
        },
      },
    );
  };

  return (
    <>
      <OrderFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={search}
      />

      <StyledActions size={24}>
        <ResendSMS
          onSuccess={() => {
            refetch();
            setSelectedRowKeys([]);
            setSelectedRows([]);
          }}
          selectedRows={selectedRows}
        />

        <Upload mutation={importOrderMutation} onSuccess={refetch} />

        <DownloadTemplate
          mutation={downloadCsvTemplateMutation}
          fileName="orders_sample.csv"
        />

        <ExportExcel mutation={exportExcelMutation} />

        <StyledButton size="large" type="primary" onClick={handleOpenDrawer}>
          {intl.formatMessage({ id: 'common.btn.addNew' })}
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
        dataSource={product?.items || []}
        loading={isLoading}
        pagination={{
          current: search?.page,
          pageSize: search?.limit,
          total: product?.total || 0,
        }}
        onChange={handleChangeTable}
      />

      <OrderFormDrawer
        open={isOpenDrawer}
        onClose={handleCloseDrawer}
        onSuccess={refetch}
      />
    </>
  );
};
