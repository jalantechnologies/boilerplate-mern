import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';
import HorizontalStackLayout from '../layouts/horizontal-stack-layout';
import Spinner from '../spinner/spinner';

interface ButtonProps {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  isLoading?: boolean;
  kind?: ButtonKind;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  size = ButtonSize.DEFAULT,
  startEnhancer,
  type = ButtonType.BUTTON,
}) => {
  const baseStyles = 'btn-base';

  const kindStyles = {
    [ButtonKind.PRIMARY]: clsx(
      'flex justify-center border bg-primary text-white active:bg-primary/80',
      disabled || isLoading
        ? 'cursor-not-allowed bg-primary/80'
        : 'hover:bg-primary/90'
    ),
    [ButtonKind.SECONDARY]: clsx(
      'flex items-center justify-start text-left text-sm text-black',
      disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
    ),
    [ButtonKind.TERTIARY]: clsx(
      'flex justify-center bg-transparent text-lg text-primary active:bg-transparent',
      disabled || isLoading ? 'cursor-not-allowed text-body' : 'cursor-pointer'
    ),
    [ButtonKind.DANGER]: clsx(
      'flex justify-center border bg-danger text-white active:bg-danger/80',
      disabled || isLoading
        ? 'cursor-not-allowed bg-danger/80'
        : 'hover:bg-danger/90'
    ),
  };

  const sizeStyles = {
    [ButtonSize.COMPACT]: 'p-2',
    [ButtonSize.DEFAULT]: 'p-2.5',
    [ButtonSize.LARGE]: 'p-3.5',
    [ButtonSize.MINI]: 'p-1.5',
  };

  const content =
    isLoading && kind === ButtonKind.PRIMARY ? <Spinner /> : children;

  return (
    <button
      className={clsx(baseStyles, kindStyles[kind], sizeStyles[size])}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      <HorizontalStackLayout gap={2}>
        {startEnhancer && (
          <span className="control-enhancer">{startEnhancer}</span>
        )}
        {content}
        {endEnhancer && <span className="control-enhancer">{endEnhancer}</span>}
      </HorizontalStackLayout>
    </button>
  );
};

export default Button;
