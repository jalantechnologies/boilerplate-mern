import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import OtpForm from './otp-form';

export const Otp: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success('OTP verification success');
    navigate(constants.DASHBOARD);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <OtpForm onSuccess={onSuccess} onError={onError}></OtpForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Otp;
