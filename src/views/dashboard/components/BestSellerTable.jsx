import { Typography } from 'antd';
import { Table } from 'components/table';
import styled from 'styled-components';

const BestSellerTableStyle = styled.div`
  .currency-unit {
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #414d63;
    margin-bottom: 16px;
    text-align: right;
  }
`;

export const BestSellerTable = () => {
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'idProduct',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'productName',
    },
    {
      title: 'Doanh số',
      dataIndex: 'sales',
    },
    {
      title: '2019',
      dataIndex: 'year2019',
    },
    {
      title: '2020',
      dataIndex: 'year2020',
    },
    {
      title: '2021',
      dataIndex: 'year2021',
    },
    {
      title: '2022',
      dataIndex: 'year2022',
    },
  ];

  return (
    <BestSellerTableStyle>
      <Typography.Text className="currency-unit">
        Đơn vị : million VNĐ
      </Typography.Text>
      <Table
        rowKey="no"
        columns={columns}
        dataSource={[
          {
            idProduct: '220802503',
            productName: 'Món hàng bán chạy 1',
            sales: '7,863',
            year2019: '68,6',
            year2020: '1121',
            year2021: '68,6',
            year2022: '68,6',
          },
          {
            idProduct: '220802503',
            productName: 'Món hàng bán chạy 1',
            sales: '7,863',
            year2019: '68,6',
            year2020: '1121',
            year2021: '68,6',
            year2022: '68,6',
          },
          {
            idProduct: '220802503',
            productName: 'Món hàng bán chạy 1',
            sales: '7,863',
            year2019: '68,6',
            year2020: '1121',
            year2021: '68,6',
            year2022: '68,6',
          },
        ]}
        pagination={false}
      />
    </BestSellerTableStyle>
  );
};
