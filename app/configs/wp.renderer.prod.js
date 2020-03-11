const path = require('path');
const merge = require('webpack-merge');
const base = require('./wp.renderer.base');

module.exports = merge.smart(base, {
  mode: 'production',
  entry: './client/index.js',
  target: 'electron-renderer',
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: 'build/',
    filename: 'renderer-bundle.js'
  },
  devtool: false
});
