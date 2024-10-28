const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const devServerOpen = process.env.WEBPACK_DEV_DISABLE_OPEN !== 'true';
const devServerPort = 3000;
const devServerAPIProxyPort = 8080;

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
    open: devServerOpen,
    port: devServerPort,
    proxy: {
      secure: false,
      '/api': {
        target: `http://localhost:${devServerAPIProxyPort}`,
        bypass: function (req) {
          if (req.url === '/api/documentation') {
            return '/index.html'; // Bypass proxy for this specific route
          }
        },
      },
      '/assets': `http://localhost:${devServerAPIProxyPort}`,
    },
  },
};

module.exports = merge(config, baseConfig);
