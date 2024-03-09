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
    code: 'CN',
    dialCode: '+86',
    flag: '🇨🇳',
    name: 'China',
  },
  {
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
    name: 'India',
  },
  {
    code: 'ID',
    dialCode: '+62',
    flag: '🇮🇩',
    name: 'Indonesia',
  },
  {
    code: 'BR',
    dialCode: '+55',
    flag: '🇧🇷',
    name: 'Brazil',
  },
  {
    code: 'NG',
    dialCode: '+234',
    flag: '🇳🇬',
    name: 'Nigeria',
  },
  {
    code: 'EG',
    dialCode: '+2',
    flag: '🇪🇬',
    name: 'Egypt',
  },
  {
    code: 'PK',
    dialCode: '+92',
    flag: '🇵🇰',
    name: 'Pakistan',
  },
  {
    code: 'BD',
    dialCode: '+880',
    flag: '🇧🇩',
    name: 'Bangladesh',
  },
  {
    code: 'RU',
    dialCode: '+7',
    flag: '🇷🇺',
    name: 'Russia',
  },
  {
    code: 'JP',
    dialCode: '+81',
    flag: '🇯🇵',
    name: 'Japan',
  },
];

export default COUNTRIES;
