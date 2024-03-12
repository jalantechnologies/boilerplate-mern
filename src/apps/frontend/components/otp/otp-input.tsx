import React, { FocusEventHandler } from 'react';

type OTPInputProps = {
  disabled: boolean;
  error: string;
  inputRef: React.RefObject<HTMLInputElement> | null;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
};

const OTPInput: React.FC<OTPInputProps> = ({
  disabled,
  error,
  inputRef,
  name,
  onBlur,
  onChange,
  onKeyDown,
  type,
  value,
}) => (
  <input
    className={`flex w-full rounded-lg border bg-transparent py-4 text-center outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${
      error ? 'border-red-500' : 'border-stroke'
    }`}
    disabled={disabled}
    name={name}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    ref={inputRef}
    value={value}
    type={type || 'number'}
  />
);

export default OTPInput;
