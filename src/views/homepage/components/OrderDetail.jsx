import { useIntl } from 'react-intl';
import { CardWrapper, ContentWrapper } from 'components/layout';
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledTypographyParagraph,
} from 'styles/overrides';
import { CollapseHeader } from 'components/collapse';
import { OrderInfo } from 'views/orders/components/OrderInfo';
import { OrderInfoDetail } from 'views/orders/components';
import { OrderHeading } from 'views/orders/components/OrderHeading';

export const OrderDetail = ({ data, isError }) => {
  const intl = useIntl();

  if (isError) {
    return (
      <StyledTypographyParagraph style={{ textAlign: 'center', marginTop: 32 }}>
        {intl.formatMessage({ id: 'views.homepage.orderNotExist' })}
      </StyledTypographyParagraph>
    );
  }

  return (
    <CardWrapper style={{ backgroundColor: 'var(--white)' }}>
      <OrderHeading orderId={data.order.code} status={data.order.status} />

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
              livestreamDate={data.order.livestreamDate}
              orderAddress={data.order.orderAddress}
              paymentStatus={data.order.payment_status}
              noteAdmin={data.order.noteAdmin}
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
            <OrderInfoDetail
              products={data.order.items}
              totalPrice={data.order.subTotal}
              currency={data.order.currency}
              note={data.order.note}
              code={data.order.code}
              banks={data.bank.items}
              noteSetting={data.info?.items?.[0]?.value}
            />
          </StyledCollapsePanel>
        </StyledCollapse>
      </ContentWrapper>
    </CardWrapper>
  );
};
