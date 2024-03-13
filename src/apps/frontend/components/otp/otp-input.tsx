import React, { FocusEventHandler } from 'react';

import Input from '../input';

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
  <Input
    disabled={disabled}
    error={error}
    index={index}
    inputRef={inputRef}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    onKeyDown={onKeyDown}
    textAlign='center'
    type={'number'}
    value={value}
  />
);

export default OTPInput;
