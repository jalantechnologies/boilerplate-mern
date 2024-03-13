import clsx from 'clsx';
import * as React from 'react';

import styles from './input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endEnhancer?: React.ReactElement | string;
  error: string;
  index?: number;
  inputRef?: React.RefObject<HTMLInputElement[]> | null;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: 'left' | 'center' | 'right';
  type?: string;
}

const Input: React.FC<InputProps> = ({
  endEnhancer,
  error,
  index,
  inputRef,
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
    ])}
  >
    {startEnhancer && <span className="mr-2 flex h-full min-w-6 items-center justify-center">
      {startEnhancer}
    </span>}
    <input
      {...props}
      className={clsx([
        styles.input,
        textAlign ? styles.textAlign[textAlign] : '',
      ])}
      data-testid={testId}
      type={type || 'text'}
      ref={inputRef ? (ref) => (inputRef.current[index] = ref) : null}
    />
    {endEnhancer && <span className="ml-2 flex h-full min-w-6 items-center justify-center">
      {endEnhancer}
    </span>}
  </div>
);

export default Input;
