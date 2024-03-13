import React, { FocusEventHandler } from 'react';

type OTPInputProps = {
  disabled: boolean;
  error: string;
  index: number;
  inputRef: React.RefObject<HTMLInputElement[]> | null;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
};

const OTPInput: React.FC<OTPInputProps> = ({
  disabled,
  error,
  index,
  inputRef,
  name,
  onBlur,
  onChange,
  onKeyDown,
  value,
}) => (
  <input
    className={`
      flex
      w-full
      rounded-lg
      border
      bg-transparent
      py-4
      text-center
      outline-none
      [appearance:textfield]
      focus:border-primary
      focus-visible:shadow-none
      [&::-webkit-inner-spin-button]:appearance-none
      ${error ? 'border-red-500' : 'border-stroke'}
    `}
    disabled={disabled}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    onKeyDown={onKeyDown}
    ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
    type={'number'}
    value={value}
  />
);

export default OTPInput;
