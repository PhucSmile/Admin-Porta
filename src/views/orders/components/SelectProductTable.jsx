import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Table } from 'components/table';
import { useProducts } from 'api/productApi';
import { FilterForm } from 'components/form';
import { DEFAULT_PAGINATION } from 'constants/common';
import { calcIndexByOrder, removeFalsyKeys } from 'utils/common';
import {
  StyledSpace,
  StyledFormItem,
  StyledInputSearch,
  StyledActions,
  StyledButton,
} from 'styles/overrides';

// TODO: Reuse ProductTable component
export const SelectProductTable = ({ onApply = () => {} }) => {
  const intl = useIntl();
  const [params, setParams] = useState({
    page: DEFAULT_PAGINATION.PAGE,
    limit: DEFAULT_PAGINATION.LIMIT,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { data: product, isLoading } = useProducts({ params });

  const columns = [
    {
      title: intl.formatMessage({ id: 'common.table.no' }),
      render: (text, record, index) => {
        return calcIndexByOrder({
          index,
          page: params.page,
          limit: params.limit,
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
    {
      title: intl.formatMessage({ id: 'views.products.table.price' }),
      dataIndex: 'price',
    },
    // {
    //   title: intl.formatMessage({ id: 'views.products.table.livestreamDate' }),
    //   dataIndex: 'livestreamDate',
    //   render: (value) => formatTime(value),
    // },
  ];

  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setParams((prevParams) => removeFalsyKeys({ ...prevParams, page, limit }));
  };

  const handleSubmitSearch = (values) => {
    setParams((prevParams) =>
      removeFalsyKeys({
        ...prevParams,
        ...values,
        page: DEFAULT_PAGINATION.PAGE,
      }),
    );
  };

  const handleClickApply = () => {
    if (selectedRows.length === 1) {
      const { id: productId, code, name, price } = selectedRows[0];

      onApply({ productId, code, name, price });
    }
  };

  return (
    <>
      <FilterForm
        onFinish={handleSubmitSearch}
        initialValues={{ search: params.search }}
      >
        <StyledSpace size={16}>
          <StyledFormItem name="search" noStyle>
            <StyledInputSearch
              style={{ width: 350 }}
              placeholder="Tìm kiếm theo : mã sản phẩm, tên sản phẩm..."
            />
          </StyledFormItem>

          {/* <StyledFormItem name="livestream_date" noStyle>
            <StyledInputSearch
              style={{ width: 350 }}
              placeholder="Tìm kiếm theo : ngày livestream..."
            />
          </StyledFormItem> */}
        </StyledSpace>
      </FilterForm>

      <StyledActions size={24}>
        <StyledButton
          size="large"
          disabled={selectedRowKeys.length !== 1}
          onClick={handleClickApply}
        >
          {intl.formatMessage({ id: 'common.btn.apply' })}
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
          current: params?.page,
          pageSize: params?.limit,
          total: product?.total || 0,
        }}
        onChange={handleChangeTable}
        title={() => 'Đơn vị: nghìn đồng'}
      />
    </>
  );
};
