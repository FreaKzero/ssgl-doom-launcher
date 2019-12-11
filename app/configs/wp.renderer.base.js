const path = require('path');
const webpack = require('webpack');

const res = p => path.resolve(__dirname, p);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: ['file-loader']
      }
    ]
  },

  output: {
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
    filename: 'renderer-bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '#Style': res(`${process.cwd()}/client/styles.js`),
      '#Component': res(`${process.cwd()}/client/components/`),
      '#Asset': res(`${process.cwd()}/client/assets/`),
      '#View': res(`${process.cwd()}/client/views/`),
      '#Util': res(`${process.cwd()}/client/utils/`),
      '#State': res(`${process.cwd()}/client/state/index.jsx`),
      '#Root': res(`${process.cwd()}/client/`)
    }
  }
};
