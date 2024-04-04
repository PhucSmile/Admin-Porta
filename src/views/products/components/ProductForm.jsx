import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Row, Col } from 'antd';
import {
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledInputNumber,
} from 'styles/overrides';
import { CardWrapper } from 'components/layout';
import { formatInputNumber, parseInputNumber } from 'utils/formatUtils';

export const ProductForm = ({ initialValues, ...props }) => {
  const intl = useIntl();

  useEffect(() => {
    props.form?.setFieldsValue(initialValues);
  }, [initialValues, props.form]);

  return (
    <CardWrapper>
      <StyledForm layout="vertical" size="large" {...props}>
        <Row gutter={[32, 0]}>
          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.code',
              })}
              name="code"
              rules={[{ required: true }]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.products.form.placeholder.code',
                })}
              />
            </StyledFormItem>
          </Col>

          <Col span={24}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.name',
              })}
              name="name"
              rules={[{ required: true }]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.products.form.placeholder.name',
                })}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.price',
              })}
              name="price"
              rules={[{ required: true }]}
            >
              <StyledInputNumber
                placeholder={intl.formatMessage({
                  id: 'views.products.form.placeholder.price',
                })}
                min={0}
                controls={false}
                formatter={formatInputNumber}
                parser={parseInputNumber}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.quantity',
              })}
              name="quantity"
              rules={[{ required: true }]}
            >
              <StyledInputNumber
                placeholder={intl.formatMessage({
                  id: 'views.products.form.placeholder.quantity',
                })}
                min={0}
                controls={false}
                formatter={formatInputNumber}
                parser={parseInputNumber}
              />
            </StyledFormItem>
          </Col>

          {/* <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'common.field.livestreamDate',
              })}
              name="livestreamDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </StyledFormItem>
          </Col> */}
        </Row>
      </StyledForm>
    </CardWrapper>
  );
};
