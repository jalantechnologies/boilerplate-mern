import { toaster } from 'baseui/toast';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import LoginForm from './login-form';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(constants.DASHBOARD);
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
