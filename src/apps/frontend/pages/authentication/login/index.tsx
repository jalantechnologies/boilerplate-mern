import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { H2, VerticalStackLayout } from '../../../components';
import routes from '../../../constants/routes';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import LoginForm from './login-form';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(routes.DASHBOARD);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const { loginProps, setLoginProps } = useAuthContext();
  const { defaultMobileLogin, defaultWebLogin } = loginProps;

  useEffect(() => {
    const updateLoginMethod = () => {
      const isMobile = window.innerWidth <= 768;
      const newLoginMethod = isMobile ? defaultMobileLogin : defaultWebLogin;

      setLoginProps((prev) => {
        if (prev.currentLoginMethod !== newLoginMethod) {
          return { ...prev, currentLoginMethod: newLoginMethod };
        }
        return prev;
      });
    };

    updateLoginMethod();
    window.addEventListener('resize', updateLoginMethod);

    return () => window.removeEventListener('resize', updateLoginMethod);
  }, [defaultMobileLogin, defaultWebLogin, setLoginProps]);

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
