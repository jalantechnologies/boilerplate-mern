const { merge } = require('webpack-merge');
const http = require('http');
const open = require('open');

const baseConfig = require('./webpack.base');

const devServerOpen = process.env.WEBPACK_DEV_DISABLE_OPEN !== 'true';
const devServerPort = 3000;
const devServerAPIProxyPort = 8080;

const API_SERVER_URL = `http://localhost:${devServerAPIProxyPort}`;
const FRONTEND_URL = `http://localhost:${devServerPort}`;
const DOCUMENTATION_PAGE_ROUTE = '/api/documentation';
const RETRY_INTERVAL_IN_MS = 2000;

function waitForBackend(port, callback) {
  function check() {
    const req = http.request(
      { method: 'HEAD', host: 'localhost', port },
      (res) => {
        if (res.statusCode < 500) {
          console.log(`Backend is ready on port ${port}`);
          callback();
        } else {
          console.log(`Waiting for backend on port ${port}...`);
          setTimeout(check, RETRY_INTERVAL_IN_MS);
        }
      }
    );

    req.on('error', () => {
      console.log(
        `Backend not ready, retrying in ${RETRY_INTERVAL_IN_MS / 1000} seconds...`
      );
      setTimeout(check, RETRY_INTERVAL_IN_MS);
    });

    req.end();
  }

  check();
}

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
    open: false,
    port: devServerPort,
    proxy: {
      secure: false,
      // Forwards requests with /api to server running on the devServerAPIProxyPort
      '/api': {
        target: API_SERVER_URL,
        bypass: function (req) {
          // To place the documentation page on the respective route, the proxy should be bypassed for this route.
          if (req.url === DOCUMENTATION_PAGE_ROUTE) {
            return '/index.html';
          }
        },
      },
      '/assets': API_SERVER_URL,
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('Webpack DevServer is not defined');
      }

      waitForBackend(devServerAPIProxyPort, () => {
        console.log('Starting Webpack Dev Server...');
        if (devServerOpen) {
          open(FRONTEND_URL);
        }
      });

      return middlewares;
    },
  },
};

module.exports = merge(config, baseConfig);
