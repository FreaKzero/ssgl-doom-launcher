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
        test: /.*ssgl-iwad-covers.*jpg$/i,
        loader: 'url-loader'
      },
      {
        test: /^((?!ssgl-iwad-covers).)*\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ogg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
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
