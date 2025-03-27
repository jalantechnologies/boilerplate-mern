import clsx from 'clsx';
import styles from 'frontend/components/button/button.styles';
import HorizontalStackLayout from 'frontend/components/layouts/horizontal-stack-layout';
import Spinner from 'frontend/components/spinner/spinner';
import { ButtonKind, ButtonSize, ButtonType } from 'frontend/types/button';
import React, { PropsWithChildren } from 'react';

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
          <span className="flex h-full min-w-6 items-center justify-center">
            {startEnhancer}
          </span>
        )}
        {content}
        {endEnhancer && (
          <span className="flex h-full min-w-6 items-center justify-center">
            {endEnhancer}
          </span>
        )}
      </HorizontalStackLayout>
    </button>
  );
};

export default Button;
