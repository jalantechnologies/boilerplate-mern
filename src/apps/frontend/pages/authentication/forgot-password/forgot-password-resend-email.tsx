import React from 'react';

import { useAuthContext } from '../../../contexts';
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
  const { isSendForgotPasswordEmailLoading, sendForgotPasswordEmail } = useAuthContext();

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
        <p>00: {timerRemainingSeconds}</p>
      </div>
      <form onSubmit={handleResendPasswordResetEmail}>
        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/80 active:bg-primary/80
            ${(isSendForgotPasswordEmailLoading || !isResendEnabled) && 'cursor-not-allowed bg-primary/80 hover:bg-primary/80'}`
          }
          disabled={isSendForgotPasswordEmailLoading || !isResendEnabled}
          type="submit"
        >
          Resend Link
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordResendEmail;