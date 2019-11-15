const { getExt } = require('./common');
const path = require('path');
const uuid = require('uuid-quick');

const isModFile = item => {
  const ALLOWED = ['PK3', 'WAD', 'DEH'];
  const EXT = path
    .parse(item)
    .ext.toUpperCase()
    .trim()
    .substr(1);

  return ALLOWED.indexOf(EXT) > -1;
};

const modItem = item => ({
  id: uuid(),
  name: path.parse(item.path).name,
  kind: getExt(item.path),
  path: item.path,
  size: item.stats.size,
  date: item.stats.birthtimeMs,
  active: false
});

module.exports = { modItem, isModFile };
