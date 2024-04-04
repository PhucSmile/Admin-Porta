// import { useIntl } from 'react-intl';
// import { Spin } from 'antd';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
// import {
//   StyledForm,
//   StyledFormItem,
//   StyledInput,
//   StyledButton,
// } from 'styles/overrides';
// import { ContentWrapper, CardWrapper } from 'components/layout';
import { OrderDetail } from './components/OrderDetail';
import { useGetOrderDetail } from 'api/orderApi';

export default function Homepage() {
  // const intl = useIntl();
  const [search] = useCustomSearchParams();
  const { data, isLoading, isError, isIdle } = useGetOrderDetail({
    params: { code: search.code },
    options: {
      enabled: !!search.code,
    },
  });

  if (data) {
    data.order.orderAddress.phone = `*${data.order.orderAddress.phone.slice(
      1,
      -2,
    )}**`;
  }

  // const handleSubmit = (values) => {
  //   setSearch(values);
  // };

  return (
    <>
      {/* <Spin spinning={isLoading}>
        <CardWrapper
          style={{
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
            backgroundColor: 'var(--white)',
          }}
        >
          <ContentWrapper
            title={intl.formatMessage({
              id: 'views.homepage.orderLookupTitle',
            })}
            hasBorder
          ></ContentWrapper>

          <StyledForm
            layout="vertical"
            size="large"
            initialValues={{ code: search.code }}
            onFinish={handleSubmit}
          >
            <StyledFormItem
              name="code"
              label={intl.formatMessage({ id: 'views.homepage.orderCode' })}
              rules={[{ required: true }]}
            >
              <StyledInput />
            </StyledFormItem>

            <StyledFormItem style={{ textAlign: 'center' }}>
              <StyledButton type="primary" htmlType="submit">
                {intl.formatMessage({ id: 'common.btn.search' })}
              </StyledButton>
            </StyledFormItem>
          </StyledForm>
        </CardWrapper>
      </Spin> */}

      {!isIdle && !isLoading && <OrderDetail data={data} isError={isError} />}
    </>
  );
}
