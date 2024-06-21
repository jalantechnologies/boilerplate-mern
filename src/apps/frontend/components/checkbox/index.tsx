import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
  />
);

export default Checkbox;
