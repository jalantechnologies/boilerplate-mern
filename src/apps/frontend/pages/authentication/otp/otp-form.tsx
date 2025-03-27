import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  OTP,
  VerticalStackLayout,
} from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../../types/button';

import useOTPForm from './otp-form-hook';

interface OTPFormProps {
  isResendEnabled: boolean;
  onError: (error: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  timerRemainingSeconds: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  isResendEnabled,
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  timerRemainingSeconds,
}) => {
  const {
    countryCode,
    formik,
    phoneNumber,
    isVerifyOTPLoading,
    handleResendOTP,
  } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!phoneNumber || !countryCode) {
      navigate(routes.LOGIN);
    }
  }, [phoneNumber, countryCode, navigate]);

  const handleChange = (value: string[]) => {
    formik
      .setFieldValue('otp', value)
      .then()
      .catch((error) => {
        onError(error as AsyncError);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VerticalStackLayout gap={5}>
        <FormControl
          label={`Enter the 4 digit code sent to the mobile number ${countryCode} ${phoneNumber}`}
          error={formik.touched.otp ? (formik.errors.otp as string) : ''}
        >
          <OTP
            error={formik.touched.otp ? (formik.errors.otp as string) : ''}
            isLoading={isVerifyOTPLoading}
            onError={onError}
            onBlur={formik.handleBlur}
            onChange={handleChange}
          />
        </FormControl>

        <Flex gap={2}>
          <p className="text-lg text-black">Did not receive a code?</p>
          <Button
            disabled={!isResendEnabled}
            kind={ButtonKind.TERTIARY}
            onClick={handleResendOTP}
          >
            {isResendEnabled
              ? 'Resend'
              : `Resend OTP in 00: ${timerRemainingSeconds}`}
          </Button>
        </Flex>

        <Button
          isLoading={isVerifyOTPLoading}
          kind={ButtonKind.PRIMARY}
          size={ButtonSize.LARGE}
          type={ButtonType.SUBMIT}
        >
          Verify
        </Button>
      </VerticalStackLayout>
    </form>
  );
};

export default OTPForm;
