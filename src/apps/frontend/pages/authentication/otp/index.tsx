import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import OTPForm from './otp-form';

export const OTPPage: React.FC = () => {
  const { startTimer, remaininingSecondsStr, isResendEnabled } = useTimer();

  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success('Logged in success');
    navigate(constants.DASHBOARD);
  };

  const onResendSuccess = () => {
    startTimer();
    toast.success('OTP resent');
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <OTPForm
          isResendEnabled={isResendEnabled}
          onError={onError}
          onResendSuccess={onResendSuccess}
          onSuccess={onSuccess}
          timerRemainingSeconds={remaininingSecondsStr}
        ></OTPForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default OTPPage;
