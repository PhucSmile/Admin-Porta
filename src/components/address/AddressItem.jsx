import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { StyledTypographyParagraph } from 'styles/overrides';
import { formatAddress } from 'utils/formatUtils';
import { CardWrapper } from 'components/layout/CardWrapper';

export const AddressItem = ({ address, isDefault = false }) => {
  const formattedAddress = formatAddress(address);

  if (!formattedAddress) {
    return null;
  }

  return (
    <CardWrapper style={{ padding: '4px 8px' }}>
      <StyledTypographyParagraph>
        {isDefault ? (
          <CheckCircleFilled style={{ color: 'var(--green600)' }} />
        ) : (
          <CloseCircleFilled style={{ color: 'var(--red600)' }} />
        )}{' '}
        {formattedAddress}
      </StyledTypographyParagraph>
    </CardWrapper>
  );
};
