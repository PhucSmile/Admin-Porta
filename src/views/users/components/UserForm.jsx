import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Row, Col } from 'antd';

import { VNMobilePhonePattern } from 'utils/validationUtils';
import {
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledInputPassword,
} from 'styles/overrides';
import { CardWrapper } from 'components/layout';
import { RoleSelector } from 'components/selector/RoleSelector';

export const UserForm = ({ initialValues, ...props }) => {
  const intl = useIntl();
  const isDisabled = !!initialValues;

  useEffect(() => {
    props.form?.setFieldsValue(initialValues);
  });

  return (
    <CardWrapper>
      <StyledForm layout="vertical" size="large" {...props}>
        <Row gutter={[32, 0]}>
          <Col span={24}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.users.form.label.fullName',
              })}
              name="fullName"
              rules={[{ required: true }]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.users.form.placeholder.fullName',
                })}
                disabled={isDisabled}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.users.form.label.email',
              })}
              name="email"
              rules={[
                { required: true },
                {
                  type: 'email',
                  message: intl.formatMessage({ id: 'validate.invalidEmail' }),
                },
              ]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.users.form.placeholder.email',
                })}
                disabled={isDisabled}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.users.form.label.phone',
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
                  id: 'views.users.form.placeholder.phone',
                })}
                disabled={isDisabled}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.users.form.label.role',
              })}
              name="role"
              rules={[{ required: true }]}
            >
              <RoleSelector
                placeholder={intl.formatMessage({
                  id: 'views.users.form.placeholder.role',
                })}
                disabled={isDisabled}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.users.form.label.password',
              })}
              name="password"
              rules={[
                { required: true },
                {
                  min: 6,
                  max: 24,
                  message: intl.formatMessage({
                    id: 'validate.invalidPassword',
                  }),
                },
              ]}
            >
              <StyledInputPassword
                placeholder={intl.formatMessage({
                  id: 'views.users.form.placeholder.password',
                })}
              />
            </StyledFormItem>
          </Col>
        </Row>
      </StyledForm>
    </CardWrapper>
  );
};
