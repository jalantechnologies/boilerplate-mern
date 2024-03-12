import React, {
  useEffect, useRef, useState, FocusEventHandler,
} from 'react';

import constant from '../../constants';
import { AsyncError, KeyboardKeys } from '../../types';

import OTPInput from './otp-input';

interface OTPProps {
  error: string;
  isLoading: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (values: string[]) => void;
  onError: (error: AsyncError) => void;
}

let currentOTPInputIndex: number = 0;

const OTP: React.FC<OTPProps> = ({
  error, isLoading, onBlur, onChange,
}) => {
  const [activeOTPInputIndex, setActiveOTPInputIndex] = useState(0);
  const [otpField, setOtpField] = useState<string[]>(Array(constant.OTP_LENGTH).fill(''));

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeOTP = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;

    // Create a copy of the OTP inputs array
    const otpInputs = [...otpField];

    // Update the OTP input value at the current index Ex. -> value: '123' --> ['1', '2', '3', '']
    otpInputs[currentOTPInputIndex] = value.substring(value.length - 1);
    setOtpField(otpInputs);

    if (!otpInputs[currentOTPInputIndex]) {
      // If the input value is empty, move to the previous input
      setActiveOTPInputIndex(currentOTPInputIndex - 1);
    } else {
      // Otherwise, move to the next input
      setActiveOTPInputIndex(currentOTPInputIndex + 1);
    }

    onChange(otpInputs);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPInputIndex]);

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPInputIndex = index;

    if (key === KeyboardKeys.BACKSPACE.toString()) {
      setActiveOTPInputIndex(currentOTPInputIndex - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-6">
      {otpField.map((_, index) => (
        <OTPInput
          key={index}
          disabled={isLoading}
          name={'otp'}
          error={error}
          onChange={handleChangeOTP}
          onBlur={onBlur}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(e, index)}
          inputRef={index === activeOTPInputIndex ? inputRef : null}
          value={otpField[index]}
        />
      ))}
    </div>
  );
};

export default OTP;
