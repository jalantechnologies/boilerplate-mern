import React from 'react';

import Button, { ButtonType } from '../../../components/button/button-primary';
import { useResetPasswordContext } from '../../../contexts';
import { AsyncError } from '../../../types';

import BackButton from './back-button';

interface ForgotPasswordResendEmailProps {
  isResendEnabled: boolean;
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
  setIsResendEmailPage: React.Dispatch<React.SetStateAction<boolean>>;
  timerRemainingSeconds: string;
  username: string;
}

const ForgotPasswordResendEmail: React.FC<ForgotPasswordResendEmailProps> = ({
  isResendEnabled,
  onError,
  onSuccess,
  setIsResendEmailPage,
  timerRemainingSeconds,
  username,
}) => {
  const { isSendForgotPasswordEmailLoading, sendForgotPasswordEmail } = useResetPasswordContext();

  const handleResendPasswordResetEmail = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    sendForgotPasswordEmail(username)
      .then(() => {
        onSuccess();
      })
      .catch((error: AsyncError) => {
        onError(error);
      });
  };

  return (
    <>
      <BackButton onClick={() => setIsResendEmailPage(false)} />
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Forgot Password?
      </h2>
      <p className="mb-4 text-xl font-medium">
        A password reset link has been sent to {username}.
        Please check your inbox and follow the instructions.
      </p>
      <div className="mb-3 flex justify-end">
        <p>Resend email in 00: {timerRemainingSeconds}</p>
      </div>
      <form onSubmit={handleResendPasswordResetEmail}>
        <Button
          disabled={!isResendEnabled}
          isLoading={isSendForgotPasswordEmailLoading}
          label="Resend Link"
          type={ButtonType.SUBMIT}
        />
      </form>
    </>
  );
};

export default ForgotPasswordResendEmail;
