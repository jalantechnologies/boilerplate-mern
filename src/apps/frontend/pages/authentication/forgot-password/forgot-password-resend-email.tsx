import React from 'react';

import { useAuthContext } from '../../../contexts';

import BackButton from './back-button';
import { AsyncError } from '../../../types';

interface ForgotPasswordResendEmailProps {
  onError: (error: AsyncError) => void;
  onSuccess: (username: string) => void;
  setIsResendEmailPage: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}

const ForgotPasswordResendEmail: React.FC<ForgotPasswordResendEmailProps> = ({
  onError,
  onSuccess,
  setIsResendEmailPage,
  username,
}) => {
  const { isSendForgotPasswordEmailLoading, sendForgotPasswordEmail } = useAuthContext();

  const handleResendPasswordResetEmail = () => {
    sendForgotPasswordEmail(username)
      .then(() => {
        onSuccess(username);
      })
      .catch((error) => {
        onError(error);
      });
  };

  return (
    <>
      <BackButton onClick={() => setIsResendEmailPage(false)} />
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Forgot Password?
      </h2>
      <p className="mb-4 text-xl font-bold">
        A password reset link has been sent to {username}.
        Please check your inbox and follow the instructions.
      </p>
      <form onSubmit={handleResendPasswordResetEmail}>
        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90 active:bg-primary/80
            ${isSendForgotPasswordEmailLoading && 'cursor-not-allowed bg-primary/80 hover:bg-primary/80'}`
          }
          disabled={isSendForgotPasswordEmailLoading}
          type="submit"
        >
          Resend Link
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordResendEmail;
