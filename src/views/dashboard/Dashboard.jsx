import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { ContentWrapper } from 'components/layout';
import { StyledSpace, StyledTypographyText } from 'styles/overrides';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { DashboardFilterSearchForm } from './components/DashboardFilterSearchForm';
import { BestSellerChart } from './components/BestSellerChart';
import { RevenueChart } from './components/RevenueChart';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';

export default function Dashboard() {
  const intl = useIntl();
  const [search, setSearch] = useCustomSearchParams();
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  const DetailLink = (
    <Link to="detail">
      <StyledTypographyText
        style={{ fontSize: 16, fontWeight: 400, color: 'var(--blue400)' }}
      >
        {intl.formatMessage({ id: 'common.btn.seeDetails' })}
      </StyledTypographyText>
      <RightOutlined style={{ color: 'var(--gray400)', marginLeft: 4 }} />
    </Link>
  );

  return (
    <ContentWrapper title={title}>
      {/* <DashboardFilterSearchForm
        onSubmit={(values) => setSearch(values)}
        initialValues={{
          groupBy: search?.groupBy ?? 'year',
        }}
      /> */}

      {/* <StyledSpace direction="vertical" size={32} className="chart-wrapper">
        <BestSellerChart detailLink={DetailLink} />

        <RevenueChart detailLink={DetailLink} />
      </StyledSpace> */}
    </ContentWrapper>
  );
}
