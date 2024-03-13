import React from 'react';

import Spinner from '../spinner/spinner';

export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick?: () => void;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  isLoading,
  label,
  onClick,
  type,
}) => (
  <button
    className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition active:bg-primary/80
      ${(disabled || isLoading) ? 'cursor-not-allowed bg-primary/80' : 'hover:bg-primary/90'}`}
    disabled={disabled || isLoading}
    type={type}
    onClick={onClick}
  >
  {isLoading ? <Spinner /> : label}
  </button>
);

export default Button;
