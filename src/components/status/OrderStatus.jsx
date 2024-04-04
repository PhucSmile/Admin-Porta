import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Tag } from 'antd';
import { ORDER_STATUS } from 'constants/status';

const StyledOrderStatus = styled(Tag)`
  margin-right: 0;
  border: none;
  border-radius: 4px;
`;

const MAPPING = {
  [ORDER_STATUS.ORDER]: {
    color: 'var(--orange600)',
    backgroundColor: 'var(--orange200)',
  },
  [ORDER_STATUS.DELIVERING]: {
    color: 'var(--purple600)',
    backgroundColor: 'var(--purple200)',
  },
  [ORDER_STATUS.COMPLETED]: {
    color: 'var(--green600)',
    backgroundColor: 'var(--green200)',
  },
  [ORDER_STATUS.CANCELED]: {
    color: 'var(--red600)',
    backgroundColor: 'var(--red200)',
  },
  [ORDER_STATUS.REFUNDED]: {
    color: 'var(--white)',
    backgroundColor: 'var(--blue600)',
  },
  [ORDER_STATUS.ON_HOLD]: {
    color: 'var(--blue600)',
    backgroundColor: 'var(--blue200)',
  },
  [ORDER_STATUS.FAIL]: {
    color: 'var(--white)',
    backgroundColor: 'var(--red500)',
  },
  [ORDER_STATUS.PENDING]: {
    color: 'var(--white)',
    backgroundColor: 'var(--orange500)',
  },
  [ORDER_STATUS.PENDING_PAYMENT]: {
    color: 'var(--black)',
    backgroundColor: 'var(--orange500)',
  },
};

export const OrderStatus = ({ status }) => {
  const intl = useIntl();

  return (
    <StyledOrderStatus style={MAPPING[status]}>
      {intl.formatMessage({ id: `common.status.order.${status}` })}
    </StyledOrderStatus>
  );
};
