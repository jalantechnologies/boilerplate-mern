import React from 'react';

interface CheckboxProps {
  onChange: (isChecked: boolean) => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => (
  <input
    type="checkbox"
    onChange={(e) => onChange(e.target.checked)}
    checked={checked}
    className="
      w-4
      h-4
      text-blue-600
      bg-white
      border-gray-300
      rounded
      focus:ring-blue-500
    "
  />
);

export default Checkbox;