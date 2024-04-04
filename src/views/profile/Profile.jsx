import { Form, Spin } from 'antd';
import { useGetCustomers } from 'api/customerApi';
import { Notification } from 'components';
import { CardWrapper, ContentWrapper } from 'components/layout';
import { useCustomSearchParams } from 'hooks/useCustomSearchParams';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  StyledButton,
  StyledForm,
  StyledFormItem,
  StyledInput,
} from 'styles/overrides';
import { VNMobilePhonePattern } from 'utils/validationUtils';
import LocalInfo from './components/LocalInfo';

function Profile() {
  const intl = useIntl();
  const [openProfileUser, setOpenProfileUser] = useState(false);
  const [search, setSearch] = useCustomSearchParams();
  const [createUser, setCreateUser] = useState(null);

  const [form] = Form.useForm();

  const { isLoading, data: dataUser } = useGetCustomers({
    params: search.phone,
    options: {
      enabled: !!search.phone,
      // validate number user
      onError: () => {
        Notification(
          'error',
          intl.formatMessage({ id: 'views.profile.numberPhoneNotExist' }),
        );
      },
      onSuccess: () => {
        Notification(
          'success',
          intl.formatMessage({
            id: 'views.profile.searchNumberPhoneSuccess',
          }),
        );
      },
    },
  });

  const handleSubmit = (value) => {
    setSearch({ phone: value.phone });
    setOpenProfileUser(true);

    // create newUser
    if (dataUser === undefined) {
      setCreateUser(value);
    }
  };

  return (
    <>
      <Spin spinning={isLoading}>
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
              id: 'views.profile.numberPhoneLookupTitle',
            })}
            hasBorder
          ></ContentWrapper>

          <StyledForm
            layout="vertical"
            size="large"
            onFinish={handleSubmit}
            form={form}
          >
            <StyledFormItem
              name="phone"
              label={intl.formatMessage({
                id: 'views.profile.numberPhoneCode',
              })}
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
                  id: 'views.orders.form.placeholder.phone',
                })}
              />
            </StyledFormItem>

            <StyledFormItem style={{ textAlign: 'center' }}>
              <StyledButton type="primary" htmlType="submit">
                {intl.formatMessage({ id: 'common.btn.search' })}
              </StyledButton>
            </StyledFormItem>
          </StyledForm>
        </CardWrapper>
      </Spin>
      {openProfileUser && (
        <CardWrapper
          style={{
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
            backgroundColor: 'var(--white)',
          }}
        >
          <LocalInfo
            dataUser={dataUser}
            createUser={createUser}
            search={search}
            setOpenProfileUser={setOpenProfileUser}
          />
        </CardWrapper>
      )}
    </>
  );
}

export default Profile;
