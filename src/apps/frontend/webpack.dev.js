const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  output: {
    pathinfo: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/assets': 'http://localhost:8080',
    },
  },
};

module.exports = merge(config, baseConfig);
