/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
const path = require('path');
const { merge } = require('webpack-merge');
const commonWebConfig = require('./webpack.web.common.config');

const config = {
  mode: 'production',
};

module.exports = merge(config, commonWebConfig);
