import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import PhoneLoginForm from './phone-login-form';

export const PhoneLogin: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success('OTP sent success');
    navigate(constants.OTP);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <PhoneLoginForm onSuccess={onSuccess} onError={onError}></PhoneLoginForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default PhoneLogin;
