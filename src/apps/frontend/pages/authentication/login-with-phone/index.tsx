import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import LoginWithPhoneForm from './login-with-phone-form';

export const LoginWithPhone: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success('OTP sent');
    navigate('/otp');
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <LoginWithPhoneForm onSuccess={onSuccess} onError={onError}></LoginWithPhoneForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default LoginWithPhone;
