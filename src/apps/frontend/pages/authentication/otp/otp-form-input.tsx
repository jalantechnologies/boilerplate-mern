import * as React from 'react';
import {
  ChangeEventHandler, FocusEventHandler, KeyboardEventHandler,
} from 'react';

interface OTPInputProps {
  disabled: boolean;
  error: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  placeholder: string;
  ref: React.LegacyRef<HTMLInputElement>;
  type?: string;
  value: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  disabled,
  error,
  name,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  ref,
  type,
  value,
}) => (
  <input
    autoComplete="off"
    className={`flex w-full rounded-lg border bg-transparent py-4 text-center outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${error ? 'border-red-500' : 'border-stroke'}`}
    disabled={disabled}
    name={name}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    ref={ref}
    placeholder={placeholder}
    value={value}
    type={type || 'text'}
  />
);

export default OTPInput;
