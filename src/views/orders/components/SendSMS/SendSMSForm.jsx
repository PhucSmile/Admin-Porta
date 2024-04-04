import { useIntl } from 'react-intl';
import { Row, Col } from 'antd';
import {
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledInputTextArea,
} from 'styles/overrides';
import { CardWrapper } from 'components/layout';
import { VNMobilePhonePattern } from 'utils/validationUtils';

export const SendSMSForm = (props) => {
  const intl = useIntl();

  return (
    <CardWrapper>
      <StyledForm layout="vertical" size="large" {...props}>
        <Row gutter={[32, 0]}>
          <Col span={24}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'components.sendSMS.form.label.phone',
              })}
              name="phone"
              rules={[
                { required: true },
                {
                  pattern: VNMobilePhonePattern,
                  message: intl.formatMessage({
                    id: 'validate.invalidPhoneNumber',
                  }),
                },
              ]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'components.sendSMS.form.placeholder.phone',
                })}
              />
            </StyledFormItem>
          </Col>

          <Col span={24}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'components.sendSMS.form.label.message',
              })}
              name="message"
              rules={[{ required: true }]}
            >
              <StyledInputTextArea
                placeholder={intl.formatMessage({
                  id: 'components.sendSMS.form.placeholder.message',
                })}
                autoSize={{ minRows: 3 }}
              />
            </StyledFormItem>
          </Col>
        </Row>
      </StyledForm>
    </CardWrapper>
  );
};
