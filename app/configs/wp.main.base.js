const path = require('path');

module.exports = {
  target: 'electron-main',
  devtool: 'source-map',
  entry: `${process.cwd()}/electron/main.js`,
  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'main-bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    __dirname: false,
    __filename: false
  }
};