import React from 'react';

import styles from './select.styles';

type OPTION = {
  label: string;
  value: string | number;
};

interface SelectProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
  multiple?: boolean;
  options: OPTION[];
  value: string | number;
}

const Select: React.FC<SelectProps> = ({
  handleChange,
  isLoading,
  multiple,
  options,
  value,
}) => (
  <select
    className={styles.select.dropdown}
    disabled={isLoading}
    multiple={multiple}
    onChange={handleChange}
    value={value}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
