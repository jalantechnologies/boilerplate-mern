import clsx from 'clsx';
import * as React from 'react';

import HorizontalStackLayout from '../layouts/horizontal-stack-layout';

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
    className={clsx(
      'input-wrapper',
      error ? 'input-error' : 'input-normal',
      disabled && 'input-disabled'
    )}
  >
    <HorizontalStackLayout gap={2}>
      {startEnhancer && (
        <span className="control-enhancer">{startEnhancer}</span>
      )}
      <input
        {...props}
        autoComplete="off"
        className={clsx(
          'input-element',
          textAlign === 'center' && 'text-center',
          textAlign === 'right' && 'text-right',
          textAlign === 'left' && 'text-left',
          disabled && 'input-disabled'
        )}
        data-testid={testId}
        type={type || 'text'}
        ref={handleInputRef ? (ref) => handleInputRef(ref) : null}
      />
      {endEnhancer && <span className="control-enhancer">{endEnhancer}</span>}
    </HorizontalStackLayout>
  </div>
);

export default Input;
