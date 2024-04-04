import React from 'react';
import { Line } from '@ant-design/plots';
import styled from 'styled-components';
import NoteList from './NoteList';
import { Typography } from 'antd';

const ChartLineStyle = styled.div`
  .cost-result {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #111b2b;
    margin-bottom: 20px;
    display: block;
  }
`;

export default function ChartLine() {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'cirlce',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  const noteList = [
    {
      title: 'Doanh thu',
      bg: '#40A0FF',
    },
  ];

  return (
    <ChartLineStyle>
      <Typography.Text className="cost-result">Cost per result</Typography.Text>
      <Line {...config} />
      <NoteList noteList={noteList} />
    </ChartLineStyle>
  );
}
