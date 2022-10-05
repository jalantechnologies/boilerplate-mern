const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  output: {
    pathinfo: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};

module.exports = merge(config, baseConfig);
