import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { ContentWrapper } from 'components/layout';
import { StyledSpace } from 'styles/overrides';
import { forceBreadcrumbs } from 'store/slices/layoutSlice';
import { BestSellerChart } from './components/BestSellerChart';
import { SaleRankReport } from './components/SaleRankReport';

export default function ViewDashboard() {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      forceBreadcrumbs([
        {
          key: 'dashboardDetail',
          label: intl.formatMessage({ id: 'views.dashboard.title.detail' }),
        },
      ]),
    );
  }, [dispatch, intl]);

  return (
    <ContentWrapper
      title={intl.formatMessage({ id: 'views.dashboard.title.detail' })}
    >
      <StyledSpace direction="vertical" size={40} className="chart-wrapper">
        <BestSellerChart />

        <SaleRankReport />
      </StyledSpace>
    </ContentWrapper>
  );
}
