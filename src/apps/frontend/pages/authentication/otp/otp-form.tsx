import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl } from '../../../components';
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

let currentOTPIndex:number = 0;

const OTPForm: React.FC<OTPFormProps> = ({
  isResendEnabled, onError, onResendSuccess, onSuccess, timerRemainingSeconds,
}) => {
  const {
    code, formik, phoneNumber, isVerifyOTPLoading, handleResendOTP,
  } = useOTPForm({
    onError, onResendSuccess, onSuccess,
  });

  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!phoneNumber || !code) {
      navigate(constants.PHONE_LOGIN);
    }
  }, [phoneNumber, code, navigate]);

  const handleChangeOTP = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = target;
    const newOTP = [...formik.values.otp as string[]];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    formik.setFieldValue('otp', newOTP).then(() => {
      if (!value) setActiveOTPIndex(currentOTPIndex - 1);
      else setActiveOTPIndex(currentOTPIndex + 1);
    }).catch((err) => { onError(err as AsyncError); });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index;

    if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1);
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
              label={`Enter the 4 digit code sent to the mobile number +${code} ********${phoneNumber?.slice(-2)}`}
              error={formik.touched.otp && formik.errors.otp as string}
            >
              <div className="flex items-center justify-center gap-6">
                {formik.values.otp.map((_, index) => (
                    <input
                      disabled={isVerifyOTPLoading}
                      key={index}
                      autoComplete="off"
                      className={`flex w-full rounded-lg border bg-transparent py-4 text-center outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-stroke'}`}
                      name={'otp'}
                      onChange={handleChangeOTP}
                      onBlur={formik.handleBlur}
                      ref={ index === activeOTPIndex ? inputRef : null}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      type={'number'}
                      value={formik.values.otp[index] as string}
                    />
                ))}
              </div>
            </FormControl>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <h2 className="text-lg text-black dark:text-white">
              Did not receive a code?
            </h2>
            <h2 className={`${isResendEnabled ? 'cursor-pointer text-primary' : 'cursor-default'} text-center text-lg dark:text-white`} onClick={handleResendOTP}>
              { isResendEnabled ? 'Resend' : 'Resend OTP in'}
            </h2>
            <h2 className="text-lg dark:text-white">
            { !isResendEnabled && `${timerRemainingSeconds}`}
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
