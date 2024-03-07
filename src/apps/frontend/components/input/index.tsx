import * as React from 'react';
import { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';

interface InputProps {
  disabled: boolean;
  error: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onSubmit?: FormEventHandler<HTMLInputElement>;
  placeholder: string;
  testId?: string;
  type?: string;
  value: string;
}

const Input: React.FC<InputProps> = ({
  disabled,
  error,
  name,
  onChange,
  onBlur,
  onSubmit,
  placeholder,
  testId,
  type,
  value,
}) => (
  <input
    autoComplete="off"
    className={`w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none [appearance:textfield] focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary [&::-webkit-inner-spin-button]:appearance-none ${
      error ? 'border-red-500' : 'border-stroke'
    }`}
    data-testid={testId}
    disabled={disabled}
    name={name}
    onChange={onChange}
    onSubmit={onSubmit}
    onBlur={onBlur}
    placeholder={placeholder}
    value={value}
    type={type || 'text'}
  />
);

export default Input;
