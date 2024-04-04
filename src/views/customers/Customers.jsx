import { useSelector } from 'react-redux';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';
import { ContentWrapper } from 'components/layout';
import { CustomerTable } from './components/CustomerTable';

export default function Customers() {
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  return (
    <ContentWrapper title={title}>
      <CustomerTable />
    </ContentWrapper>
  );
}
