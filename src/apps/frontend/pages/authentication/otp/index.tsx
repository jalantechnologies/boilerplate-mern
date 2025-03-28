import { Button, H2, VerticalStackLayout } from 'frontend/components';
import routes from 'frontend/constants/routes';
import AuthenticationFormLayout from 'frontend/pages/authentication/authentication-form-layout';
import AuthenticationPageLayout from 'frontend/pages/authentication/authentication-page-layout';
import OTPForm from 'frontend/pages/authentication/otp/otp-form';
import { AsyncError } from 'frontend/types';
import { ButtonKind } from 'frontend/types/button';
import useTimer from 'frontend/utils/use-timer.hook';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const OTPVerificationPage: React.FC = () => {
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
    toast.success(
      'OTP has been successfully re-sent. Please check your messages.'
    );
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const handleBackButtonClick = () => {
    navigate(routes.LOGIN);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <VerticalStackLayout gap={8}>
          <Button kind={ButtonKind.SECONDARY} onClick={handleBackButtonClick}>
            Back
          </Button>
          <H2>Verify Your Account</H2>
          <OTPForm
            isResendEnabled={isResendEnabled}
            onError={onError}
            onResendOTPSuccess={onResendOTPSuccess}
            onVerifyOTPSuccess={onVerifyOTPSuccess}
            timerRemainingSeconds={remaininingSecondsStr}
          />
        </VerticalStackLayout>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default OTPVerificationPage;
