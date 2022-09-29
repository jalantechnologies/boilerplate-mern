/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const commonWebConfig = require('./webpack.common');

const config = {
  mode: 'development',
  output: {
    pathinfo: true,
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
  ],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

module.exports = merge(config, commonWebConfig);
