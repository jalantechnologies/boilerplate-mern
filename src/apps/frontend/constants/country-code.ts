interface CountryCode {
  code: string,
  country: string,
  flag: string,
  label: string,
}

const COUNTRY_CODE: CountryCode[] = [
  {
    code: '+1',
    country: 'US',
    flag: '🇺🇸',
    label: 'United States',
  },
  {
    code: '+91',
    country: 'IN',
    flag: '🇮🇳',
    label: 'India',
  },
];

export default COUNTRY_CODE;
