import React, { useEffect, useRef, useState } from 'react';

import { FormControl } from '../../../components';
import { AsyncError } from '../../../types';

import useOtpForm from './otp-form-hook';

interface LoginWithPhoneFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

let currentOtpIndex:number = 0;

const OtpForm: React.FC<LoginWithPhoneFormProps> = ({ onError, onSuccess }) => {
  const { formik, isLoginLoading } = useOtpForm({ onSuccess, onError });

  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [timer, setTimer] = useState(59);
  const [isResendClickable, setIsResendClickable] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeOtp = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = target;
    const newOtp = [...formik.values.otp as string[]];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    formik.setFieldValue('otp', newOtp).then(() => {}).catch(() => {});

    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    else setActiveOtpIndex(currentOtpIndex + 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOtpIndex = index;

    if (key === 'Backspace') setActiveOtpIndex(currentOtpIndex - 1);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setIsResendClickable(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleResendOtp = () => {
    setIsResendClickable(false);
    startTimer();
  };

  return (
    <div className="w-full xl:w-2/5">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Verify Your Account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <FormControl
              label={'Enter the 6 digit code sent to the mobile number'}
              error={formik.touched.otp && formik.errors.otp as string}
            >
              <div className="flex items-center justify-center gap-3">
                {formik.values.otp.map((_, index) => (
                    <input
                      key={index}
                      autoComplete="off"
                      className={`flex w-full rounded-lg border bg-transparent py-4 text-center outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-stroke'}`}
                      name={'otp'}
                      onChange={handleChangeOtp}
                      onBlur={formik.handleBlur}
                      ref={ index === activeOtpIndex ? inputRef : null}
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
            <h2 className={`${isResendClickable ? 'cursor-pointer text-primary' : 'cursor-default'} text-center text-lg dark:text-white`} onClick={handleResendOtp}>
              Resend
            </h2>
            <h2 className="text-lg text-black dark:text-white">
            { !isResendClickable && `00:${String(Math.floor(timer / 10))}${String(timer % 10)}`}
            </h2>
          </div>

          <button
            className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
              ${isLoginLoading && 'cursor-not-allowed bg-primary/90'}`}
            disabled={isLoginLoading}
            type="submit"
          >
            Verify
          </button>
          <h2 className="mt-6 text-lg font-medium text-red-500">
            Don’t share the verification code with anyone!
          </h2>
        </form>
      </div>
    </div>
  );
};
export default OtpForm;
