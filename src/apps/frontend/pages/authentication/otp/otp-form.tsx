import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, FormControl, OTP } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonType } from '../../../types/button';

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
    countryCode, formik, phoneNumber, isVerifyOTPLoading, handleResendOTP,
  } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!phoneNumber || !countryCode) {
      navigate(routes.PHONE_LOGIN);
    }
  }, [phoneNumber, countryCode, navigate]);

  const handleChange = (value: string[]) => {
    formik.setFieldValue('otp', value).then().catch((error) => { onError(error as AsyncError); });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <FormControl
            label={`Enter the 4 digit code sent to the mobile number ${countryCode} ${phoneNumber}`}
            error={formik.touched.otp && formik.errors.otp as string}
          >
            <OTP
              error={formik.touched.otp && formik.errors.otp as string}
              isLoading={isVerifyOTPLoading}
              onError={onError}
              onBlur={formik.handleBlur}
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div className="mb-6 flex flex-col items-center gap-2 md:flex-row">
          <h2 className="text-lg text-black">
            Did not receive a code?
          </h2>
          <h2
            className={`
              ${isResendEnabled ? 'cursor-pointer text-primary' : 'cursor-default'}
              text-center text-lg`
            }
            onClick={handleResendOTP}
          >
            { isResendEnabled ? 'Resend' : `Resend OTP in 00: ${timerRemainingSeconds}` }
          </h2>
        </div>

        <Button type={ButtonType.SUBMIT} isLoading={isVerifyOTPLoading} kind={ButtonKind.PRIMARY}>
          Verify
        </Button>
      </form>
    </>
  );
};

export default OTPForm;
