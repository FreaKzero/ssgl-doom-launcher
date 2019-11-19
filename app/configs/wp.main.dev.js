const path = require('path');
const base = require('./wp.main.base.js');
const merge = require('webpack-merge');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(path.join(process.cwd(), 'build', 'main-bundle.js')),
});

module.exports = merge.smart(base, {
  mode: 'development',
  watch: true,
  plugins: [
    ElectronReloadPlugin()
  ]
});
