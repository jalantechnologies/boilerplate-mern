interface CountryCode {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

const COUNTRIES: CountryCode[] = [
  {
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    name: 'United States',
  },
  {
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
    name: 'India',
  },
];

export default COUNTRIES;
