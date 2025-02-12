import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { Flex, H2, VerticalStackLayout } from '../../../components';
import constant from '../../../constants';
import routes from '../../../constants/routes';
import { useAuthContext } from '../../../contexts';
import { AsyncError, LoginMethod } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import SignupForm from './signup-form';


export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success(
      'Your account has been successfully created. Please login to continue.'
    );
    navigate(routes.LOGIN);
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
          <Flex gap={80}>
            <H2>Sign Up</H2>
            {loginProps.currentLoginMethod === LoginMethod.PHONE && (
              <p className="ml-10 self-center font-medium">
                <Link to={routes.DASHBOARD} className="text-slate-500">
                  Skip for now
                </Link>
              </p>
            )}
          </Flex>
          <SignupForm onSuccess={onSuccess} onError={onError} />
        </VerticalStackLayout>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Signup;
