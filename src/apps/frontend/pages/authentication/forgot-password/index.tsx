import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import ForgotPasswordForm from './forgot-password-form';
import ForgotPasswordResendEmail from './forgot-password-resend-email';

export const ForgotPassword: React.FC = () => {
  const [isResendEmailPage, setIsResendEmailPage] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const onSendEmailSuccess = (newUsername: string) => {
    setUsername(newUsername);
    setIsResendEmailPage(true);
  };

  const onResendEmailSuccess = (emailOrUsername: string) => {
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
              onSuccess={onResendEmailSuccess}
              onError={onError}
              setIsResendEmailPage={setIsResendEmailPage}
              username={username}
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
