import clsx from 'clsx';
import styles from 'frontend/components/input/input.styles';
import HorizontalStackLayout from 'frontend/components/layouts/horizontal-stack-layout';
import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  error: string;
  handleInputRef?: (ref: HTMLInputElement) => void;
  index?: number;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: 'left' | 'center' | 'right';
  type?: string;
}

const Input: React.FC<InputProps> = ({
  disabled,
  endEnhancer,
  error,
  handleInputRef,
  index,
  startEnhancer,
  testId,
  textAlign = 'left',
  type,
  ...props
}) => (
  <div
    className={clsx([
      styles.inputContainer,
      error ? styles.border.errorState : styles.border.normalState,
      disabled ? styles.disabled : '',
    ])}
  >
    <HorizontalStackLayout gap={2}>
      {startEnhancer && (
        <span className="flex h-full min-w-6 items-center justify-center">
          {startEnhancer}
        </span>
      )}
      <input
        {...props}
        autoComplete="off"
        className={clsx([
          styles.input,
          disabled ? styles.disabled : '',
          textAlign ? styles.textAlign[textAlign] : '',
        ])}
        data-testid={testId}
        type={type || 'text'}
        ref={handleInputRef ? (ref) => handleInputRef(ref) : null}
      />
      {endEnhancer && (
        <span className="flex h-full min-w-6 items-center justify-center">
          {endEnhancer}
        </span>
      )}
    </HorizontalStackLayout>
  </div>
);

export default Input;
