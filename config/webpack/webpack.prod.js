/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const commonWebConfig = require('./webpack.common');

const config = {
  mode: 'production',
};

module.exports = merge(config, commonWebConfig);
