import React from 'react';
import { useIntl } from 'react-intl';
import { ContentWrapper } from 'components/layout';
import { OrderHeading } from '../OrderHeading';
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledTypographyParagraph,
} from 'styles/overrides';
import { CollapseHeader } from '../../../../components/collapse';
import { OrderInfo } from '../OrderInfo';
import { ProductTable } from 'components/product/ProductTable';

export const PrintOrder = React.forwardRef((props, ref) => {
  const intl = useIntl();
  const {
    code,
    status,
    livestreamDate,
    orderAddress,
    paymentStatus,
    noteAdmin,
    products = [],
    totalPrice,
    currency,
  } = props;

  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>
        <OrderHeading orderId={code} status={status} />

        <div>
          <ContentWrapper>
            <StyledCollapse defaultActiveKey={[1, 2]} expandIconPosition="end">
              <StyledCollapsePanel
                header={
                  <CollapseHeader
                    title={intl.formatMessage({
                      id: 'views.products.title.orderInfo',
                    })}
                  />
                }
                key={1}
              >
                <OrderInfo
                  livestreamDate={livestreamDate}
                  orderAddress={orderAddress}
                  paymentStatus={paymentStatus}
                  noteAdmin={noteAdmin}
                />
              </StyledCollapsePanel>
              <StyledCollapsePanel
                header={
                  <CollapseHeader
                    title={intl.formatMessage({
                      id: 'views.products.title.orderDetails',
                    })}
                  />
                }
                key={2}
              >
                <ProductTable
                  dataSource={products}
                  totalPrice={totalPrice}
                  currency={currency}
                  isFixedWidth
                />

                <StyledTypographyParagraph style={{ marginTop: 16 }}>
                  <p style={{ color: 'var(--gray600)' }}>
                    {intl.formatMessage({
                      id: 'views.orders.orderInfo.noteDescription',
                    })}
                    : {code}
                  </p>
                </StyledTypographyParagraph>
              </StyledCollapsePanel>
            </StyledCollapse>
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
});
