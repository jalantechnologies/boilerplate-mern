import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl, OTP } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';

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

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
              ${isVerifyOTPLoading && 'cursor-not-allowed bg-primary/90'}`}
          disabled={isVerifyOTPLoading}
          type="submit"
        >
          Verify
        </button>
        <h2 className="mt-6 text-lg font-medium text-red-500">
          Don’t share the verification code with anyone!
        </h2>
      </form>
    </>
  );
};

export default OTPForm;
