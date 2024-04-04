import { useIntl } from 'react-intl';
import { StyledSpace, StyledTypographyText } from 'styles/overrides';

export const OrderId = ({ orderId = 'XXXXXXXX' }) => {
  const intl = useIntl();

  return (
    <StyledSpace>
      <StyledTypographyText
        style={{ fontSize: 18, color: 'var(--gray500)', fontWeight: 600 }}
      >
        {intl.formatMessage({ id: 'views.orders.orderInfo.code' })}:
      </StyledTypographyText>
      <StyledTypographyText
        style={{ fontSize: 18, color: 'var(--primary)', fontWeight: 600 }}
      >
        {orderId}
      </StyledTypographyText>
    </StyledSpace>
  );
};
