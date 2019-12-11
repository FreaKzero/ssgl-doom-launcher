const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./wp.renderer.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new ErrorOverlayPlugin()
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 1666,
    contentBase: './',
    hot: true,
    historyApiFallback: true
  }
});
