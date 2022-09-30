const path = require('path');
const webpack = require('webpack');

const CONFIG = require('config');

const config = {
  target: 'web',
  entry: [
    './src/public/js/site.tsx',
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'web.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(CONFIG) }),
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
  },
};

module.exports = config;
