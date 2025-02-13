import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { Flex, H2, VerticalStackLayout } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError, LoginMethod } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';
import { useLoginMethod } from '../useLoginMethod.hook';

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

  const { loginProps } = useLoginMethod();

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <VerticalStackLayout gap={8}>
          <Flex gap={4} justifyContent="between">
            <H2>Sign Up</H2>
            {loginProps.currentLoginMethod === LoginMethod.PHONE &&
              loginProps.displayRegisterAccountMobile === false && (
                <p className="self-center font-medium ">
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
