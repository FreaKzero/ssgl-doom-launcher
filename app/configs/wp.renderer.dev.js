const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./wp.renderer.base');

module.exports = merge.smart(base, {
  mode: 'development',
  entry: './client/index.js',
  target: 'electron-renderer',
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'renderer-bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new webpack.NamedModulesPlugin(),
    new ErrorOverlayPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true
  }
});
