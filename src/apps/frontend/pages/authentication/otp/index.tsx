import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { OTP_RESEND_DELAY_IN_MILLISECONDS } from '../../../constants/timer';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import OTPForm from './otp-form';

export const OTPPage: React.FC = () => {
  const { startTimer, remaininingSecondsStr, isResendEnabled } = useTimer(
    { delayInMilliseconds: OTP_RESEND_DELAY_IN_MILLISECONDS },
  );

  const navigate = useNavigate();

  const onSuccess = () => {
    navigate(constants.DASHBOARD);
  };

  const onResendSuccess = () => {
    startTimer();
    toast.success('OTP has been successfully re-sent. Please check your messages.');
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
