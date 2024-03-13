import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FormContainer } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import OTPForm from './otp-form';

export const OTPPage: React.FC = () => {
  const sendOTPDelayInMilliseconds = 60_000;

  const { startTimer, remaininingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const navigate = useNavigate();

  const onVerifyOTPSuccess = () => {
    navigate(routes.DASHBOARD);
  };

  const onResendOTPSuccess = () => {
    startTimer();
    toast.success('OTP has been successfully re-sent. Please check your messages.');
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <FormContainer
          body={
            <OTPForm
              isResendEnabled={isResendEnabled}
              onError={onError}
              onResendOTPSuccess={onResendOTPSuccess}
              onVerifyOTPSuccess={onVerifyOTPSuccess}
              timerRemainingSeconds={remaininingSecondsStr}
            />
          }
          navigateBackwardURL={routes.PHONE_LOGIN}
          title="Verify Your Account"
        />
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default OTPPage;
