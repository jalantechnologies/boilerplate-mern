import React from 'react';

import COUNTRIES from '../../../constants/countries';

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
    className='items-center justify-center rounded-lg border border-stroke bg-transparent px-2 py-4 text-lg outline-none focus:border-primary focus-visible:shadow-none'
  >
    {COUNTRIES.map((item, index) => (
      <option key={index} value={[item.dialCode, item.code]}>
        <p>{item.flag} {item.code} ({item.dialCode})</p>
      </option>
    ))}
  </select>
);

export default CountryCodeSelect;
