import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { H2, VerticalStackLayout } from '../../../components';
import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import PhoneLoginForm from './phone-login-form';


export const PhoneLogin: React.FC = () => {
  const onSendOTPSuccess = () => {
    toast.success(
      'OTP has been sent successfully. Please check your messages.'
    );
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const { loginProps, setLoginProps } = useAuthContext();
  const { defaultMobileLogin, defaultWebLogin } = loginProps;

  useEffect(() => {
    const updateLoginMethod = () => {
      const isMobile = window.innerWidth <= constant.MOBILE_BREAKPOINT;
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
          <PhoneLoginForm
            onError={onError}
            onSendOTPSuccess={onSendOTPSuccess}
          />
        </VerticalStackLayout>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default PhoneLogin;
