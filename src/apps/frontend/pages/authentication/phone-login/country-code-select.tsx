import React from 'react';

import COUNTRIES from '../../../constants/country-code';

interface CountryCodeSelectProps {
  isLoading: boolean;
  value: [string, string];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  isLoading,
  value,
  handleChange,
}) => (
    <select
      disabled={isLoading}
      value={value}
      onChange={handleChange}
      multiple={false}
      className='w-44 items-center justify-center rounded-lg border bg-transparent px-2 py-4 text-lg outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
    >
      {COUNTRIES.map((item, index) => (
        <option key={index} value={[item.dial_code, item.code]}>
          <p>{item.flag}</p>
          <p> {item.code} ({item.dial_code})</p>
        </option>
      ))}
    </select>
);

export default CountryCodeSelect;
