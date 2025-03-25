const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    screens: {
      '2xsm': '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#1C2434',
        body: '#64748B',
        bodydark: '#AEB7C0',
        bodydark1: '#DEE4EE',
        bodydark2: '#8A99AF',
        primary: '#3C50E0',
        secondary: '#80CAEE',
        stroke: '#E2E8F0',
        gray: '#EFF4FB',
        graydark: '#333A48',
        whiten: '#F1F5F9',
        boxdark: '#24303F',
        'boxdark-2': '#1A222C',
        strokedark: '#2E3A47',
        'form-strokedark': '#3d4d60',
        'form-input': '#1d2a39',
        'meta-4': '#313D4A',
        danger: '#D34053',
      },
      fontSize: {
        'title-xxl': ['44px', '55px'],
        'title-xl': ['36px', '45px'],
        'title-xl2': ['33px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
        'title-sm': ['20px', '26px'],
        'title-xsm': ['18px', '24px'],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        11: '2.75rem',
        12.5: '3.125rem',
        14: '3.5rem',
        40: '10rem',
        52: '13rem',
        52.5: '13.125rem',
        60: '15rem',
        72.5: '18.125rem',
        180: '45rem',
      },
      zIndex: {
        ...defaultTheme.zIndex,
        99999: '99999',
        9999: '9999',
        999: '999',
      },
      opacity: {
        65: '.65',
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
      },
    },
  },
  plugins: [],
};
