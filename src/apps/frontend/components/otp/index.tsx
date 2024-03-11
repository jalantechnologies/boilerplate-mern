import React, {
  useEffect, useRef, useState, FocusEventHandler,
} from 'react';

import constant from '../../constants';
import { AsyncError, KeyboardKeys } from '../../types';

interface OTPProps {
  error: string;
  isLoading: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (values: string[]) => void;
  onError: (error: AsyncError) => void;
}

let currentOTPIndex: number = 0;

const OTP: React.FC<OTPProps> = ({
  error,
  isLoading,
  onBlur,
  onChange,
}) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [otpField, setOtpField] = useState<string[]>(Array(constant.OTP_LENGTH).fill(''));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeOTP = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP = [...otpField];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    setOtpField(newOTP);
    if (!value) {
      setActiveOTPIndex(currentOTPIndex - 1);
    } else {
      setActiveOTPIndex(currentOTPIndex + 1);
    }
    onChange(newOTP);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index;

    if (key === (KeyboardKeys.BACKSPACE as string)) {
      setActiveOTPIndex(currentOTPIndex - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-6">
      {otpField.map((_, index) => (
        <input
          key={index}
          className={`flex w-full rounded-lg border bg-transparent py-4 text-center outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${
            error ? 'border-red-500' : 'border-stroke'
          }`}
          disabled={isLoading}
          name={'otp'}
          onChange={handleChangeOTP}
          onBlur={onBlur}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          ref={index === activeOTPIndex ? inputRef : null}
          value={otpField[index]}
          type={'number'}
        />
      ))}
    </div>
  );
};

export default OTP;
