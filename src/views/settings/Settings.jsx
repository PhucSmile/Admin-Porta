import { useSelector } from 'react-redux';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import { getFirstTitleFromBreadcrumbs } from 'utils/common';
import { ContentWrapper } from 'components/layout';
import { PaymentSetting } from './components/PaymentSetting';
import { NoteSetting } from './components/NoteSetting';

export default function Settings() {
  const currentBreadcrumbs = useSelector(getBreadcrumbs);
  const title = getFirstTitleFromBreadcrumbs(currentBreadcrumbs);

  return (
    <ContentWrapper title={title} hasBorder>
      <NoteSetting />

      <PaymentSetting />
    </ContentWrapper>
  );
}
