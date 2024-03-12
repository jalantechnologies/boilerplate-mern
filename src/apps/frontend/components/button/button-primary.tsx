import React from 'react';

export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

interface ButtonPrimaryProps {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: ButtonType;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  disabled,
  label,
  onClick,
  type,
}) => (
    <button
      className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition active:bg-primary/80
        ${disabled ? 'cursor-not-allowed bg-primary/80' : 'hover:bg-primary/90'}`
      }
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
);

export default ButtonPrimary;
