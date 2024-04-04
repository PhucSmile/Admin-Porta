import { Form, message, Typography } from 'antd';
import { DownloadIcon, UploadIcon } from 'assets/icons';
import { FilterForm } from 'components/form';
import { Modal } from 'components/modal';
import { Table } from 'components/table';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import React, { useState } from 'react'
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { StyledActions, StyledButton, StyledFormItem, StyledInputSearch, StyledSelect, StyledSpace } from 'styles/overrides';
import { calcIndexByOrder, formatTime, removeFalsyKeys } from 'utils';
import { ProductForm } from 'views/products/components/ProductForm';
import { useCreateProduct, useProducts } from 'views/products/queries';


const LinkIdProductFormStyled = styled.div`
  .currency-unit {
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #414D63;
    margin-bottom: 16px;
    text-align: right;
  }
`;

export const LinkIdProductForm = () => {

  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const { data: product, isLoading, refetch } = useProducts({ params: search });
  const createProductMutation = useCreateProduct();
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
      title: intl.formatMessage({ id: 'views.products.table.code' }),
      dataIndex: 'code',
      className: 'withColor',
      width: 118
    },
    {
      title: intl.formatMessage({ id: 'views.products.table.name' }),
      dataIndex: 'name',
      width: 456
    },
    {
      title: intl.formatMessage({ id: 'views.products.table.price' }),
      dataIndex: 'price',
      width: 216
    }
  ];


  const handleChangeTable = ({ current: page, pageSize: limit }) => {
    setSearch(removeFalsyKeys({ ...search, page, limit }));
  };

  const handleSubmitSearch = (values) => {
    setSearch(removeFalsyKeys({ ...search, ...values, page: 1 }));
  };

  const handleSubmitData = (values) => {
    createProductMutation.mutate(values, {
      onSuccess: () => {
        message.success('Thành công');
        refetch();
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  return (
    <LinkIdProductFormStyled>
      <FilterForm
        onFinish={handleSubmitSearch}
        initialValues={{ search: search.search }}
        btnsearch
      >
        <StyledSpace size={16}>
          <StyledFormItem name="search" noStyle>
            <StyledInputSearch
              style={{ width: 351 }}
              placeholder="Tìm kiếm theo : mã sản phẩm, tên sản phẩm..."
            />
          </StyledFormItem>
        </StyledSpace>
      </FilterForm>

      <StyledActions size={24}>
        <StyledButton
          size="large"
          disabled={selectedRowKeys.length === 0}
        >
          Apply
        </StyledButton>
      </StyledActions>
      <Typography.Text className='currency-unit'>Đơn vị: nghìn đồng</Typography.Text>
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
    </LinkIdProductFormStyled>
  );
}
