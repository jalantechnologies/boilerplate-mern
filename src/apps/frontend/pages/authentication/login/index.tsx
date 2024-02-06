import { toaster } from 'baseui/toast';
import React from 'react';

import constant from '../../../constants';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import LoginForm from './login-form';

export const Login: React.FC = () => {
  const onSuccess = () => {
    toaster.positive(constant.LOGIN_SUCCESS_MSG);
  };

  const onError = (error: AsyncError) => {
    toaster.negative(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <LoginForm onSuccess={onSuccess} onError={onError}></LoginForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Login;
