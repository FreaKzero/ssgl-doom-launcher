const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./wp.renderer.base');

module.exports = merge.smart(base, {
  mode: 'production',
  entry: './client/index.js',
  target: 'electron-renderer',
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'renderer-bundle.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ],
  devtool: 'source-map'
});
