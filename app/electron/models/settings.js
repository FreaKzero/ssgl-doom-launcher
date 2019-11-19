const fs = require('fs');
const { getConfigFile } = require('../utils/common');

const file = getConfigFile('settings.json');

const saveSettings = data => {
  return new Promise((resolve, reject) => {
    return fs.writeFile(file, JSON.stringify(data, null, 2), err =>
      err ? reject(err) : resolve(data)
    );
  });
};

const getSettings = () =>
  new Promise((resolve, reject) => {
    return fs.readFile(file, 'utf8', (err, data) => {
      return err ? reject(err) : resolve(JSON.parse(data));
    });
  });

module.exports = {
  getSettings,
  saveSettings
};
