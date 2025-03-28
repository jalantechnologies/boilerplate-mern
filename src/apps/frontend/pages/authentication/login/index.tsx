import { H2, VerticalStackLayout } from 'frontend/components';
import routes from 'frontend/constants/routes';
import AuthenticationFormLayout from 'frontend/pages/authentication/authentication-form-layout';
import AuthenticationPageLayout from 'frontend/pages/authentication/authentication-page-layout';
import LoginForm from 'frontend/pages/authentication/login/login-form';
import { AsyncError } from 'frontend/types';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(routes.DASHBOARD);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <VerticalStackLayout gap={8}>
          <H2>Log In</H2>
          <LoginForm onSuccess={onSuccess} onError={onError} />
        </VerticalStackLayout>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Login;
