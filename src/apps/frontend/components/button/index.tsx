import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';
import HorizontalStackLayout from '../layouts/horizontal-stack-layout';
import Spinner from '../spinner/spinner';

import styles from './button.styles';

interface ButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (e) => void;
  size?: ButtonSize;
  startEnhancer?: React.ReactElement | string;
  type?: ButtonType;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  endEnhancer,
  isLoading,
  kind = ButtonKind.PRIMARY,
  onClick,
  size,
  startEnhancer,
  type = ButtonType.BUTTON,
}) => {
  const content =
    isLoading && kind === ButtonKind.PRIMARY ? <Spinner /> : children;

  return (
    <button
      className={clsx([
        styles.kind[kind].base,
        disabled || isLoading
          ? styles.kind[kind].disableState
          : styles.kind[kind].enableState,
        size && styles.size[size],
      ])}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      <HorizontalStackLayout gap={2}>
        {startEnhancer && (
          <span className={styles.buttonEnhancer}>{startEnhancer}</span>
        )}
        {content}
        {endEnhancer && (
          <span className={styles.buttonEnhancer}>{endEnhancer}</span>
        )}
      </HorizontalStackLayout>
    </button>
  );
};

export default Button;
