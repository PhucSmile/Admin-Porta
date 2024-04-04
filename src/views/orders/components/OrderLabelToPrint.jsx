import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Descriptions } from 'antd';
import { formatAddress } from 'utils';

const StyledOrderInfo = styled.div`
  .ant-descriptions {
    border-bottom: 1px solid;
    margin-bottom: 15px;
  }

  .ant-descriptions-item-container {
    display: flex;
  }

  .ant-descriptions-item-label {
    font-size: 17px;
    color: black;
    font-weight: bold;
    line-clamp: 1;
  }

  .ant-descriptions-item-content {
    font-size: 17px;
    color: black;
    font-weight: 600;
  }
  .note {
    font-style: italic;
    color: black;
    font-size: 15px;
    font-weight: 500;
  }

  @media (max-width: 450px) {
    .ant-descriptions-item-container {
      flex-direction: column;
    }
  }
`;

export const OrderLabelToPrint = React.forwardRef(
  ({ code, orderAddress }, ref) => {
    const intl = useIntl();

    const { fullName, phone, address, district, province } = orderAddress;

    return (
      <div
        ref={ref}
        className="orderLabelPrintContainer"
        style={{ padding: 16, border: '2px solid var(--black)' }}
      >
        <StyledOrderInfo>
          <h2
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '15px',
              fontSize: '18px',
            }}
          >
            VU HOANG - VU DAI SHOP
          </h2>

          <Descriptions column={1}>
            <Descriptions.Item
              label={intl.formatMessage({
                id: 'views.orders.orderInfo.code',
              })}
            >
              {code}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: 'views.orders.orderInfo.fullName',
              })}
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
          </Descriptions>

          <div className="note">
            <span
              style={{
                fontWeight: 'bold',
                marginRight: '5px',
                textDecoration: 'underline',
              }}
            >
              Lưu ý:
            </span>
            <span>
              Quý khách nhận hàng vui lòng quay clip đơn hàng niêm phong và quay
              đến khi kiểm tra hàng xong. Shop chỉ giải quyết đơn hàng có vấn đề
              thiếu hoặc lỗi khi có clip quay và báo trong vòng 1-2 ngày sau khi
              nhận hàng. Báo cho nhân viên có tên trong link tin nhắn chôt đơn.
            </span>
          </div>
        </StyledOrderInfo>
      </div>
    );
  },
);
