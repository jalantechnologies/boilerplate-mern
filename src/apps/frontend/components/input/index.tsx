import clsx from 'clsx';
import * as React from 'react';

import HorizontalStackLayout from '../layouts/horizontal-stack-layout';

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
}) => {
  const handleRef = (ref: HTMLInputElement) => {
    if (inputRef) {
      /* eslint-disable no-param-reassign */
      inputRef.current[index]. = ref;
    }
  };

  return (
    <div
      className={clsx([
        styles.inputContainer,
        error ? styles.border.errorState : styles.border.normalState,
      ])}
    >
      <HorizontalStackLayout gap={2}>
        {startEnhancer && <span className="flex h-full min-w-6 items-center justify-center">
          {startEnhancer}
        </span>}
        <input
          {...props}
          autoComplete='off'
          className={clsx([
            styles.input,
            textAlign ? styles.textAlign[textAlign] : '',
          ])}
          data-testid={testId}
          type={type || 'text'}
          ref={inputRef ? handleRef : null}
        />
        {endEnhancer && <span className="flex h-full min-w-6 items-center justify-center">
          {endEnhancer}
        </span>}
      </HorizontalStackLayout>
    </div>
  );
};

export default Input;
