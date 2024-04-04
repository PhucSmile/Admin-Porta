import { Column } from '@ant-design/plots';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ChartColumnStyle = styled.div`
  .cost-result {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #111b2b;
    margin-bottom: 20px;
    display: block;
  }
`;

export default function ChartColumn() {
  const data = [
    {
      total: 17971378,
      product_id: 76,
      product_name: 'Electronic Soft Mouse',
      year: 2022,
      group_name: 'Món hàng bán chạy 1',
    },
    {
      total: 15653340,
      product_id: 91,
      product_name: 'Gorgeous Granite Car',
      year: 2022,
      group_name: 'Món hàng bán chạy 2',
    },
    {
      total: 14739488,
      product_id: 57,
      product_name: 'Modern Soft Pants',
      year: 2022,
      group_name: 'Món hàng bán chạy 3',
    },
    {
      total: 18356679,
      product_id: 45,
      product_name: 'Small Steel Keyboard',
      year: 2021,
      group_name: 'Món hàng bán chạy 1',
    },
    {
      total: 17266014,
      product_id: 88,
      product_name: 'Ergonomic Frozen Tuna',
      year: 2021,
      group_name: 'Món hàng bán chạy 2',
    },
    {
      total: 16480280,
      product_id: 95,
      product_name: 'Recycled Bronze Mouse',
      year: 2021,
      group_name: 'Món hàng bán chạy 3',
    },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'total',
    seriesField: 'group_name',
    isGroup: 'true',
    legend: {
      position: 'bottom',
      marker: {
        symbol: 'circle',
      },
    },
    tooltip: {
      customItems: (originalItems) => {
        return originalItems.map((item) => ({
          ...item,
          name: item.data.product_name,
        }));
      },
    },
  };

  return (
    <ChartColumnStyle>
      <Typography.Text className="cost-result">Cost per result</Typography.Text>
      <Column {...config} />
    </ChartColumnStyle>
  );
}
