interface CountryCode {
  dial_code: string;
  code: string;
  flag: string;
  name: string;
}

const COUNTRY_CODE: CountryCode[] = [
  {
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
    name: 'United States',
  },
  {
    dial_code: '+86',
    code: 'CN',
    flag: '🇨🇳',
    name: 'China',
  },
  {
    dial_code: '+91',
    code: 'IN',
    flag: '🇮🇳',
    name: 'India',
  },
  {
    dial_code: '+62',
    code: 'ID',
    flag: '🇮🇩',
    name: 'Indonesia',
  },
  {
    dial_code: '+55',
    code: 'BR',
    flag: '🇧🇷',
    name: 'Brazil',
  },
  {
    dial_code: '+234',
    code: 'NG',
    flag: '🇳🇬',
    name: 'Nigeria',
  },
  {
    dial_code: '+2',
    code: 'EG',
    flag: '🇪🇬',
    name: 'Egypt',
  },
  {
    dial_code: '+92',
    code: 'PK',
    flag: '🇵🇰',
    name: 'Pakistan',
  },
  {
    dial_code: '+880',
    code: 'BD',
    flag: '🇧🇩',
    name: 'Bangladesh',
  },
  {
    dial_code: '+7',
    code: 'RU',
    flag: '🇷🇺',
    name: 'Russia',
  },
  {
    dial_code: '+81',
    code: 'JP',
    flag: '🇯🇵',
    name: 'Japan',
  },
];

export default COUNTRY_CODE;
