import clsx from 'clsx';
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
} from 'react';

import styles from './input.styles';

interface TextAreaProps {
  cols: number;
  disabled: boolean;
  error: string;
  name: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: FormEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  rows: number;
  testId?: string;
  value: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  cols,
  disabled,
  error,
  name,
  onBlur,
  onChange,
  onSubmit,
  placeholder,
  rows,
  testId,
  value,
}) => (
  <textarea
    cols={cols}
    rows={rows}
    value={value}
    placeholder={placeholder}
    className={clsx(
      styles.input.textArea.base,
      error
        ? styles.input.textArea.errorBorder
        : styles.input.textArea.normalBorder
    )}
    onChange={onChange}
    data-testid={testId}
    disabled={disabled}
    name={name}
    onBlur={onBlur}
    onSubmit={onSubmit}
  />
);

export default TextArea;
