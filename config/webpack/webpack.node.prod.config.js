/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const commonNodeConfig = require('./webpack.node.common.config');

const config = {
  mode: 'production',
};

module.exports = merge(config, commonNodeConfig);
