import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl, OTP } from '../../../components';
import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';

import useOTPForm from './otp-form-hook';

interface OTPFormProps {
  isResendEnabled: boolean;
  onError: (error: AsyncError) => void;
  onResendSuccess: () => void;
  onSuccess: () => void;
  timerRemainingSeconds: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  isResendEnabled, onError, onResendSuccess, onSuccess, timerRemainingSeconds,
}) => {
  const {
    countryCode, formik, phoneNumber, isVerifyOTPLoading, handleResendOTP,
  } = useOTPForm({
    onError, onResendSuccess, onSuccess,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!phoneNumber || !countryCode) {
      navigate(constants.PHONE_LOGIN);
    }
  }, [phoneNumber, countryCode, navigate]);

  const handleChange = (value: string[]) => {
    formik.setFieldValue('otp', value).then().catch((error) => { onError(error as AsyncError); });
  };

  return (
    <>
      <button
        onClick={() => navigate(constants.PHONE_LOGIN)}
        className="mb-5 cursor-pointer text-lg transition active:text-primary/80"
      >
        Back
      </button>
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Verify Your Account
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <FormControl
            label={`Enter the 4 digit code sent to the mobile number +${countryCode} ${phoneNumber}`}
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
          <h2 className="text-lg text-black dark:text-white">
            Did not receive a code?
          </h2>
          <h2 className={`${isResendEnabled ? 'cursor-pointer text-primary' : 'cursor-default'} text-center text-lg dark:text-white`} onClick={handleResendOTP}>
            { isResendEnabled ? 'Resend' : `Resend OTP in 00: ${timerRemainingSeconds}`}
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
