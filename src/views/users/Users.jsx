import { useSelector } from 'react-redux';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';
import { ContentWrapper } from 'components/layout';
import { UserTable } from './components/UserTable';

export default function Users() {
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  return (
    <ContentWrapper title={title}>
      <UserTable />
    </ContentWrapper>
  );
}
