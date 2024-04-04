/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import {
  calcIndexByOrder,
  removeFalsyKeys,
  // calcCurrentPageWithNum,
  formatCurrency,
} from 'utils';
import { Table } from 'components/table';
import { StyledActions, StyledButton } from 'styles/overrides';
import {
  // useDeleteProduct,
  useProducts,
} from 'api/productApi';
// import { Notification } from 'components/Notification';
import { ProductFilterSearchForm } from './ProductFilterSearchForm';
import { ProductModal } from './ProductModal';

export const ProductTable = () => {
  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const { data: product, isLoading, refetch } = useProducts({ params: search });
  // const deleteProductMutation = useDeleteProduct();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
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
      title: intl.formatMessage({ id: 'views.products.table.code' }),
      dataIndex: 'code',
      className: 'withColor',
    },
    {
      title: intl.formatMessage({ id: 'views.products.table.name' }),
      dataIndex: 'name',
    },
    // {
    //   title: intl.formatMessage({ id: 'common.table.livestreamDate' }),
    //   dataIndex: 'livestreamDate',
    //   render: (value) => formatTime(value),
    // },
    {
      title: intl.formatMessage({ id: 'views.products.table.price' }),
      dataIndex: 'price',
      render: (value) => formatCurrency(value),
    },
    {
      title: intl.formatMessage({ id: 'views.products.table.quantity' }),
      dataIndex: 'quantity',
    },
  ];

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  // const handleDelete = async () => {
  //   try {
  //     const result = await Promise.all(
  //       selectedRowKeys.map((rowKey) => {
  //         return deleteProductMutation.mutateAsync(rowKey);
  //       }),
  //     );

  //     const calculatedPage = calcCurrentPageWithNum({
  //       page: search.page,
  //       limit: search.limit,
  //       total: product.items,
  //       num: result.length,
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

  //     setSelectedRowKeys([]);
  //     setSelectedRows([]);
  //   } catch (error) {
  //     Notification('error', intl.formatMessage({ id: 'message.commonError' }));
  //   }
  // };

  const handleClickEdit = () => {
    if (selectedRows.length !== 1) {
      return;
    }

    setIsOpenModal(true);
    setSelectedValue(selectedRows[0]);
  };

  return (
    <>
      <ProductFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={search}
      />

      <StyledActions size={24}>
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

        {/* <StyledButton
          size="large"
          disabled={selectedRowKeys.length === 0}
          onClick={handleDelete}
        >
          {intl.formatMessage({ id: 'common.btn.delete' })}
        </StyledButton> */}
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

      <ProductModal
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
