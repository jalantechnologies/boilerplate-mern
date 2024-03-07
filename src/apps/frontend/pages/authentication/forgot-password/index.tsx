import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import ForgotPasswordForm from './forgot-password-form';
import ForgotPasswordResendEmail from './forgot-password-resend-email';

export const ForgotPassword: React.FC = () => {
  const [isResendEmailPage, setIsResendEmailPage] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const { startTimer, remaininingSecondsStr, isResendEnabled } = useTimer();

  const onSendEmailSuccess = (newUsername: string) => {
    startTimer();
    setUsername(newUsername);
    setIsResendEmailPage(true);
  };

  const onResendEmailSuccess = (emailOrUsername: string) => {
    startTimer();
    toast.success(`A password reset link has been re-sent to ${emailOrUsername}. Please check your inbox`);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        {
          isResendEmailPage
            ? <ForgotPasswordResendEmail
              isResendEnabled={isResendEnabled}
              onSuccess={onResendEmailSuccess}
              onError={onError}
              setIsResendEmailPage={setIsResendEmailPage}
              username={username}
              timerRemainingSeconds={remaininingSecondsStr}
            /> : <ForgotPasswordForm
              onSuccess={onSendEmailSuccess}
              onError={onError}
              username={username}
            />
        }
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default ForgotPassword;
