const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const getSettings = () => {
  const file = getConfigFile('settings.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};
const getConfigFile = file => {
  const filepath = path.join(app.getPath('userData'), file);
  if (!fs.existsSync(filepath)) {
    fs.closeSync(fs.openSync(filepath, 'w'));
  }
  return filepath;
};

const getExt = str => {
  return path
    .parse(str)
    .ext.toUpperCase()
    .substr(1);
};

module.exports = {
  getExt,
  getConfigFile,
  getSettings
};
