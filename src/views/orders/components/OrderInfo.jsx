import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Descriptions } from 'antd';

import { formatTime, formatAddress } from 'utils';

const StyledOrderInfo = styled.div`
  .ant-descriptions-item-container {
    display: flex;
  }

  .ant-descriptions-item-label {
    font-size: 16px;
    color: var(--gray500);
    // min-width: 180px;
    line-clamp: 1;
  }

  .ant-descriptions-item-content {
    font-size: 16px;
    color: var(--gray900);
  }

  @media (max-width: 450px) {
    .ant-descriptions-item-container {
      flex-direction: column;
    }
  }
`;

export const OrderInfo = ({
  livestreamDate,
  orderAddress,
  paymentStatus,
  noteAdmin,
}) => {
  const intl = useIntl();
  const { fullName, phone, address, district, province } = orderAddress;

  return (
    <StyledOrderInfo>
      <Descriptions column={1}>
        <Descriptions.Item
          label={intl.formatMessage({ id: 'common.field.livestreamDate' })}
          // span={2}
        >
          {formatTime(livestreamDate)}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ id: 'views.orders.orderInfo.fullName' })}
        >
          {fullName}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            id: 'views.orders.orderInfo.phoneNumber',
          })}
        >
          {phone}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            id: 'views.orders.orderInfo.address',
          })}
          // span={2}
        >
          {formatAddress({ address, district, province })}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            id: 'views.orders.orderInfo.confirmPayment',
          })}
        >
          {intl.formatMessage({
            id: `common.status.paymentStatus.${paymentStatus}`,
          })}
        </Descriptions.Item>
        {noteAdmin && (
          <Descriptions.Item
            label={intl.formatMessage({
              id: 'views.orders.orderInfo.noteAdmin',
            })}
          >
            {noteAdmin}
          </Descriptions.Item>
        )}
      </Descriptions>
    </StyledOrderInfo>
  );
};
