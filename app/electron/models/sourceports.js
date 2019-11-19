const Datastore = require('nedb');
const path = require('path');
const {app} = require('electron');

const file = path.join(app.getPath('home'),'ssgl','sourceports.json');
const db = new Datastore({ filename: file, autoload: true });

const getSourcePort = id => {
  return new Promise((resolve, reject) => {
    db.findOne({ _id: 'cZC4cDLKlE77py0b' }, function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
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
  getSourcePort
};
