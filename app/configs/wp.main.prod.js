const base = require('./wp.main.base.js');
const merge = require('webpack-merge');

module.exports = merge.smart(base, {
  mode: 'production',
  devtool: false
});
