import styled from 'styled-components';

import { StyledSpace } from 'styles/overrides';
import { OrderStatus } from 'components/status';
import { OrderId } from './OrderId';

const StyledOrderHeading = styled.div`
  padding: 16px;
  background-color: var(--white);
  border: 1px solid var(--gray300);

  .info {
    > .ant-space-item + .ant-space-item {
      padding-left: 24px;
      margin-left: 24px;
      border-left: 1px solid var(--gray300);
    }
  }
  @media (max-width: 550px) {
    .info .ant-space-item:last-child {
      border-left: none;
      margin-left: 0;
    }
  }
  @media (max-width: 490px) {
    .info .ant-space-item:last-child {
      padding-left: 0;
    }
  }
`;

export const OrderHeading = ({ orderId, status, extra }) => {
  return (
    <StyledOrderHeading>
      <StyledSpace style={{ justifyContent: 'space-between' }}>
        <StyledSpace size={0} className="info">
          <OrderId orderId={orderId} />
          <OrderStatus status={status} />
        </StyledSpace>

        {extra}
      </StyledSpace>
    </StyledOrderHeading>
  );
};
