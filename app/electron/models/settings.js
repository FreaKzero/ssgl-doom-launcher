const Datastore = require('nedb');
const path = require('path');

const file = path.join(__dirname, 'settings.json');
const db = new Datastore({ filename: file, autoload: true });

const init = () => {};
