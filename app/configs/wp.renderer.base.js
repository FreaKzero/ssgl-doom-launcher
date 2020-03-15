const path = require('path');

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif)([\?]?.*)$/,
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
      '#': res(`${process.cwd()}/client/`)
    }
  }
};
