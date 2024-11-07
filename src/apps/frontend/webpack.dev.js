const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const devServerOpen = process.env.WEBPACK_DEV_DISABLE_OPEN !== 'true';
const devServerPort = 3000;
const devServerAPIProxyPort = 8080;

const DOCUMENTATION_PAGE_ROUTE = '/api/documentation';

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
      // Forwards requests with /api to server running on the devServerAPIProxyPort
      '/api': {
        target: `http://localhost:${devServerAPIProxyPort}`,
        bypass: function (req) {
          // To place the documentation page on the respective route, the proxy should be bypassed for this route.
          if (req.url === DOCUMENTATION_PAGE_ROUTE) {
            return '/index.html';
          }
        },
      },
      '/assets': `http://localhost:${devServerAPIProxyPort}`,
    },
  },
};

module.exports = merge(config, baseConfig);
