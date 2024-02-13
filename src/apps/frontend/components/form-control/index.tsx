import React, { PropsWithChildren } from 'react';

interface FormControlProps {
  label: string,
  error: string,
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({
  children,
  label,
  error,
}) => (
  <>
    <label className="mb-2.5 block font-medium text-black dark:text-white">
      {label}
    </label>
    <div className="relative">{children}</div>
    {error && (
      <div className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
        {error}
      </div>
    )}
  </>
);

export default FormControl;
