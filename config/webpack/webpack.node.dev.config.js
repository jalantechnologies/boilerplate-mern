/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');
const commonNodeConfig = require('./webpack.node.common.config');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [
    new NodemonPlugin(),
  ],
};

module.exports = merge(config, commonNodeConfig);
