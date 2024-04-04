import { useSelector } from 'react-redux';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';
import { ContentWrapper } from 'components/layout';
import { ProductTable } from './components/ProductTable';

export default function Products() {
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  return (
    <ContentWrapper title={title}>
      <ProductTable />
    </ContentWrapper>
  );
}
