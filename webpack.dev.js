/* eslint-disable no-process-env */

'use strict';

process.env.NODE_ENV = 'development';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    index: '',
    proxy: {
      '**': 'http://localhost:8000',
      '/ws': {
        target: 'http://localhost:8000',
        ws: true,
      },
    },
    hot: false,
    writeToDisk: true,
    // @@@ https://github.com/webpack/webpack-dev-server/issues/1604
    disableHostCheck: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
});
