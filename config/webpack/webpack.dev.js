const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  output: {
    pathinfo: true,
  },
  devtool: 'inline-source-map',
};

module.exports = merge(config, baseConfig);
