import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Form, Row, Col } from 'antd';

import { StyledForm, StyledSpace, StyledButton } from 'styles/overrides';

const StyledFilterForm = styled.div`
  padding: 24px;
  background-color: var(--gray100);
  border: 1px solid var(--gray300);
  box-shadow: inset 0px 2px 0px rgba(231, 235, 238, 0.2);
  border-radius: 4px;
  margin-bottom: 24px;
  .ant-btn-lg {
    height: 32px !important;
    padding: 0 15px !important;
  }
`;

export const FilterForm = ({
  children,
  initialValues,
  extraActions,
  ...props
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleReset = () => {
    form.resetFields();
    form.submit();
  };

  return (
    <StyledFilterForm>
      <Row gutter={[100, 0]}>
        <Col span={16}>
          <StyledForm {...props} form={form}>
            {children}
          </StyledForm>
        </Col>

        <Col span={8}>
          <StyledSpace size={16} style={{ justifyContent: 'flex-end' }}>
            <StyledButton type="dark" onClick={form.submit}>
              {intl.formatMessage({ id: 'common.btn.search' })}
            </StyledButton>

            <StyledButton onClick={handleReset}>
              {intl.formatMessage({ id: 'common.btn.reset' })}
            </StyledButton>

            {extraActions}
          </StyledSpace>
        </Col>
      </Row>
    </StyledFilterForm>
  );
};
