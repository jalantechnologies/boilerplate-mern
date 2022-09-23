const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const config = {
  mode: 'development',
  target: 'node',
  entry: {
    main: './src/server.ts',
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'node.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
    ],
  },
  externals: [
    nodeExternals(),
  ], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true, // in order to ignore built-in modules like path, fs, etc.
  },
  plugins: [
    new NodemonPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/views',
          to: 'views',
        },
      ],
    }),
  ],
};

module.exports = config;
