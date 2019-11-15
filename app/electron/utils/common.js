const path = require('path');

const getExt = str => {
  return path
    .parse(str)
    .ext.toUpperCase()
    .substr(1);
};

module.exports = {
  getExt
};
