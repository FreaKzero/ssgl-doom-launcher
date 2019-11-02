const webpack = require('webpack');
const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const res = p => path.resolve(__dirname, p);

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '#Style': res('src/styles.js'),
      '#Component': res('src/components/'),
      '#Asset': res('src/assets/'),
      '#View': res('src/views/'),
      '#Util': res('src/utils/'),
      '#Root': res('src/')
    }
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true
  }
};
