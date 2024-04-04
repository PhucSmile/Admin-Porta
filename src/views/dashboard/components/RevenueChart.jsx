import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { Area } from '@ant-design/plots';
import { CardWrapper, ContentWrapper } from 'components/layout';
import { StyledTypographyText } from 'styles/overrides';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { useRevenue } from 'api/dashboardApi';
import { formatCurrency } from 'utils/formatUtils';

export const RevenueChart = ({ detailLink }) => {
  const intl = useIntl();
  const [search] = useCustomSearchParams();

  const normalizeData = useCallback((data) => {
    return _.map(data, (item) => ({ ...item, total: +item.total }));
  }, []);

  const {
    data = [],
    isLoading,
    isFetching,
  } = useRevenue({
    params: {
      groupBy: search?.groupBy ?? 'year',
    },
    options: {
      select: (res) => normalizeData(res),
    },
  });

  const config = {
    data,
    xField: 'time',
    yField: 'total',
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: '#40A0FF',
        stroke: '#40A0FF',
        lineWidth: 2,
      },
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    tooltip: {
      customItems: (originalItems) => {
        return originalItems.map((item) => ({
          ...item,
          name: intl.formatMessage({ id: 'views.dashboard.total' }),
          value: formatCurrency(item.value),
        }));
      },
    },
    yAxis: {
      label: {
        formatter: (text) => formatCurrency(text),
      },
    },
  };

  if (isLoading || isFetching) {
    return null;
  }

  return (
    <CardWrapper
      style={{
        padding: 24,
        boxShadow:
          '0px 0px 0px 1px rgba(25, 37, 50, 0.1), 0px 3px 7px -3px rgba(25, 37, 50, 0.1), 0px 6px 12px -2px rgba(25, 37, 50, 0.1)',
      }}
    >
      <ContentWrapper
        title={intl.formatMessage({
          id: 'views.dashboard.revenueTitle',
        })}
        hasBorder
        size="small"
        extraActions={detailLink}
      >
        <StyledTypographyText
          style={{
            fontSize: 14,
            color: 'var(--gray900)',
            marginBottom: 16,
            display: 'inline-block',
            fontWeight: 500,
          }}
        >
          {intl.formatMessage({ id: 'views.dashboard.costPerResult' })}
        </StyledTypographyText>
        <Area {...config} />
      </ContentWrapper>
    </CardWrapper>
  );
};
