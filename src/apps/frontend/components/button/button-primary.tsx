import React, { PropsWithChildren } from 'react';

import { ButtonKind, ButtonType } from '../../types/button';
import Spinner from '../spinner/spinner';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e) => void;
  type?: ButtonType;
  kind: ButtonKind;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  isLoading,
  onClick,
  type,
  kind,
}) => (
  <button
    className={ kind === ButtonKind.PRIMARY ? `w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition active:bg-primary/80
      ${(disabled || isLoading) ? 'cursor-not-allowed bg-primary/80' : 'hover:bg-primary/90'}` : 'inset-y-0 flex items-center'}
    disabled={disabled || isLoading}
    type={type}
    onClick={onClick}
  >
  {isLoading && kind === ButtonKind.PRIMARY ? <Spinner /> : children}
  </button>
);

export default Button;
