import clsx from 'clsx';
import * as React from 'react';

import HorizontalStackLayout from '../layouts/horizontal-stack-layout';

import styles from './input.styles';

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
      styles.input.container,
      error ? styles.input.border.error : styles.input.border.normal,
      disabled && styles.input.disabled,
    ])}
  >
    <HorizontalStackLayout gap={2}>
      {startEnhancer && (
        <span className={styles.input.enhancerWrapper}>{startEnhancer}</span>
      )}
      <input
        {...props}
        autoComplete="off"
        className={clsx([
          styles.input.field,
          disabled && styles.input.disabled,
          textAlign && styles.input.textAlign[textAlign],
        ])}
        data-testid={testId}
        type={type || 'text'}
        ref={handleInputRef ? (ref) => handleInputRef(ref) : null}
      />
      {endEnhancer && (
        <span className={styles.input.enhancerWrapper}>{endEnhancer}</span>
      )}
    </HorizontalStackLayout>
  </div>
);

export default Input;
