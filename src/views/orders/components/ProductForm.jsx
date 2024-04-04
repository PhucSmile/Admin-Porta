import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import {
  StyledSpace,
  StyledFormItem,
  StyledInput,
  StyledInputNumber,
  StyledInputSearch,
  StyledTypographyText,
} from 'styles/overrides';
import { CloseIcon } from 'assets/icons';
import { formatInputNumber, parseInputNumber } from 'utils/formatUtils';

const StyledProductForm = styled.div`
  .heading {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray800);
    padding: 16px;
    background-color: var(--blue200);
    border: 1px solid var(--gray300);
    border-left: none;
    border-right: none;
    justify-content: space-between;

    .anticon {
      cursor: pointer;
    }
  }

  .body {
    padding: 16px;
  }
`;

export const ProductForm = ({
  name,
  onRemove,
  onSearchProduct,
  disabled = false,
  ...restField
}) => {
  const intl = useIntl();

  return (
    <StyledProductForm>
      <StyledSpace className="heading">
        <StyledTypographyText>
          {intl.formatMessage(
            { id: 'views.products.form.label.heading' },
            { index: name + 1 },
          )}
        </StyledTypographyText>

        <CloseIcon onClick={() => onRemove(name)} />
      </StyledSpace>

      <div className="body">
        <Row gutter={[32, 0]}>
          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.code',
              })}
              {...restField}
              name={[name, 'code']}
              rules={[{ required: true }]}
            >
              <StyledInputSearch
                readOnly
                onSearch={() => onSearchProduct(name)}
                // disabled={disabled}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.name',
              })}
              {...restField}
              name={[name, 'name']}
              rules={[{ required: true }]}
            >
              <StyledInput disabled={disabled} />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.price',
              })}
              {...restField}
              name={[name, 'price']}
              rules={[{ required: true }]}
            >
              <StyledInput />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.products.form.label.quantity',
              })}
              {...restField}
              name={[name, 'quantity']}
              rules={[{ required: true }]}
            >
              <StyledInputNumber
                // disabled={disabled}
                controls={false}
                formatter={formatInputNumber}
                parser={parseInputNumber}
              />
            </StyledFormItem>
          </Col>
        </Row>
      </div>
    </StyledProductForm>
  );
};
