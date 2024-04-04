import { useSelector } from 'react-redux';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';
import { ContentWrapper } from 'components/layout';
import { LogTable } from './components/LogTable';

export default function Logs() {
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  return (
    <ContentWrapper title={title}>
      <LogTable />
    </ContentWrapper>
  );
}
