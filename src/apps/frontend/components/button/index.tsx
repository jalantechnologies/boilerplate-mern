import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';
import Spinner from '../spinner/spinner';

import styles from './button.styles';

interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (e) => void;
  size?: ButtonSize;
  type?: ButtonType;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  isLoading,
  kind = ButtonKind.PRIMARY,
  onClick,
  size = ButtonSize.DEFAULT,
  type = ButtonType.BUTTON,
}) => {
  const content = isLoading && kind === ButtonKind.PRIMARY ? <Spinner /> : children;

  return (
    <button
      className={clsx([
        styles.kind[kind].base,
        (disabled || isLoading) ? styles.kind[kind].disableState : styles.kind[kind].enableState,
        size && styles.size[size],
      ])}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
