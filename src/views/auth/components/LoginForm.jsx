import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { unwrapResult } from '@reduxjs/toolkit';
import { STORAGE_KEY } from 'constants/common';
import { PATH_NAME } from 'constants/routes';
import { parseJwt } from 'utils/common';
import { doLogin } from 'store/slices/authSlice';
import Notification from 'components/Notification';

import {
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledInputPassword,
  StyledButton,
} from 'styles/overrides';

export const LoginForm = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  // const from = location.state?.from?.pathname || PATH_NAME.ROOT;

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const result = await dispatch(doLogin(values));
      unwrapResult(result);

      navigate(PATH_NAME.ROOT);
    } catch (error) {
      Notification('error', error.message);

      setIsLoading(false);
    }
  };

  if (isLoggedIn || parseJwt(localStorage.getItem(STORAGE_KEY.TOKEN))) {
    return <Navigate to={PATH_NAME.ROOT} />;
  }

  return (
    <StyledForm size="large" layout="vertical" onFinish={handleSubmit}>
      <StyledFormItem
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'validate.required' }),
          },
        ]}
      >
        <StyledInput
          placeholder={intl.formatMessage({
            id: 'views.auth.login.form.placeholder.username',
          })}
        />
      </StyledFormItem>

      <StyledFormItem
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'validate.required' }),
          },
        ]}
      >
        <StyledInputPassword
          placeholder={intl.formatMessage({
            id: 'views.auth.login.form.placeholder.password',
          })}
        />
      </StyledFormItem>

      <StyledFormItem style={{ marginBottom: 0, marginTop: 40 }}>
        <StyledButton
          htmlType="submit"
          block
          type="primary"
          loading={isLoading}
        >
          {intl.formatMessage({ id: 'common.btn.login' })}
        </StyledButton>
      </StyledFormItem>
    </StyledForm>
  );
};
