import React from 'react';

import { Button, Flex, VerticalStackLayout } from '../../../components';
import ParagraphMedium from '../../../components/typography/paragraph-medium';
import { useResetPasswordContext } from '../../../contexts';
import { AsyncError } from '../../../types';
import { ButtonType } from '../../../types/button';

interface ForgotPasswordResendEmailProps {
  isResendEnabled: boolean;
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
  timerRemainingSeconds: string;
  username: string;
}

const ForgotPasswordResendEmail: React.FC<ForgotPasswordResendEmailProps> = ({
  isResendEnabled,
  onError,
  onSuccess,
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
    <VerticalStackLayout gap={4}>
      <ParagraphMedium>
        A password reset link has been sent to {username}.
        Please check your inbox and follow the instructions.
      </ParagraphMedium>
      <Flex justifyContent='end'>
        <p>Resend email in 00: {timerRemainingSeconds}</p>
      </Flex>
      <form onSubmit={handleResendPasswordResetEmail}>
        <Button
          disabled={!isResendEnabled}
          isLoading={isSendForgotPasswordEmailLoading}
          type={ButtonType.SUBMIT}
        >
          Resend Link
        </Button>
      </form>
    </VerticalStackLayout>
  );
};

export default ForgotPasswordResendEmail;
