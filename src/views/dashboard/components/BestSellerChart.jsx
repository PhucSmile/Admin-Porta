import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { Column } from '@ant-design/plots';
import { CardWrapper, ContentWrapper } from 'components/layout';
import { StyledTypographyText } from 'styles/overrides';
import { useBestSeller } from 'api/dashboardApi';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { formatCurrency } from 'utils/formatUtils';

export const BestSellerChart = ({ detailLink }) => {
  const intl = useIntl();
  const [search] = useCustomSearchParams();

  const normalizeData = useCallback(
    (data) => {
      let newData = [];

      _.forEach(data, (item) => {
        _.forEach(item, (value, key) => {
          if (value?.length > 0) {
            const result = _.chain(value)
              .slice(0, 3)
              .map((item, index) => ({
                ...item,
                total: parseFloat(item.total),
                group: key,
                groupNameIndex: intl.formatMessage(
                  { id: 'views.dashboard.bestSellingItem' },
                  { index: index + 1 },
                ),
              }))
              .value();

            newData = [...newData, ...result];
          } else {
            newData.push({ group: key });
          }
        });
      });

      return newData;
    },
    [intl],
  );

  const {
    data = [],
    isLoading,
    isFetching,
  } = useBestSeller({
    params: {
      groupBy: search?.groupBy ?? 'year',
    },
    options: {
      select: (res) => normalizeData(res),
    },
  });

  const config = {
    data,
    xField: 'group',
    yField: 'total',
    seriesField: 'groupNameIndex',
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
          name: item?.data?.product_name,
          value: formatCurrency(item.value),
        }));
      },
    },
    marginRatio: 0,
    columnWidthRatio: 0.2,
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
          id: 'views.dashboard.bestSellingOrderTitle',
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
        <Column {...config} />
      </ContentWrapper>
    </CardWrapper>
  );
};
