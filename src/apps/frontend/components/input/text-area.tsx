import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react';

interface TextAreaProps {
  cols: number;
  disabled: boolean;
  error: string | false | undefined;
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
