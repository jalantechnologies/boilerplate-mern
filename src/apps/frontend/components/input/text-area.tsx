import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';

interface TextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  rows: number;
  cols: number;
  placeholder: string;
  disabled: boolean;
  error: string;
  name: string;
  testId?: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onSubmit?: FormEventHandler<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  rows,
  cols,
  placeholder,
  disabled,
  error,
  name,
  testId,
  onBlur,
  onSubmit,
}) => (
  <textarea
    cols={cols}
    rows={rows}
    value={value}
    placeholder={placeholder}
    className={`w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none ${
      error ? 'border-red-500' : 'border-stroke'
    }`}
    onChange={onChange}
    data-testid={testId}
    disabled={disabled}
    name={name}
    onBlur={onBlur}
    onSubmit={onSubmit}
  />
);

export default TextArea;
