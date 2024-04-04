import { useIntl } from 'react-intl';
import { StyledTypographyParagraph } from 'styles/overrides';
import { ProductTable } from 'components/product/ProductTable';
import { OrderNoteSetting } from './OrderNoteSetting';
import { OrderBankSetting } from './OrderBankSetting';

export const OrderInfoDetail = ({
  products = [],
  totalPrice,
  currency,
  note,
  code,
  banks,
  noteSetting,
}) => {
  const intl = useIntl();

  return (
    <>
      <ProductTable
        dataSource={products}
        totalPrice={totalPrice}
        currency={currency}
      />

      <StyledTypographyParagraph style={{ marginTop: 16 }}>
        <p style={{ color: 'var(--gray600)' }}>
          {intl.formatMessage({ id: 'views.orders.orderInfo.noteDescription' })}
          : {code}
        </p>
        <p style={{ color: 'var(--gray900)', marginTop: 16 }}>
          {intl.formatMessage({ id: 'views.orders.orderInfo.note' })}: {note}
        </p>
      </StyledTypographyParagraph>

      <OrderNoteSetting noteSetting={noteSetting} />

      <OrderBankSetting banks={banks} />
    </>
  );
};
