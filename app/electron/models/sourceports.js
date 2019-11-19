const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');
const { getConfigFile } = require('../utils/common');

const file = getConfigFile('sourceports.json');
const db = new Datastore({ filename: file, autoload: true });
console.log(file);

const getSourcePorts = id => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, doc) => (err ? reject(err) : resolve(doc)));
  });
};

const getSourcePort = id => {
  return new Promise((resolve, reject) => {
    db.findOne({ _id: 'cZC4cDLKlE77py0b' }, (err, doc) =>
      db.find({}, (err, doc) => (err ? reject(err) : resolve(doc)))
    );
  });
};

const init = () => {
  const collection = {
    path: '/Applications/GZDoom.app/Contents/MacOS/gzdoom',
    iwad: '-iwad',
    mod: '-file'
  };

  return new Promise((resolve, reject) => {
    db.insert(collection, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve('OK');
      }
    });
  });
};

module.exports = {
  init,
  getSourcePort,
  getSourcePorts
};
