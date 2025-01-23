module.exports = {
  '*.{js,ts,tsx}': [
    'prettier --write --ignore-path .prettierignore',
    'eslint --fix',
  ],
};
