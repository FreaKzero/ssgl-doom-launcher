import path from 'path';
import { app } from 'electron';
const getDataFile = file => path.join(app.getPath('userData'), file);

const getExt = str =>
  path
    .parse(str)
    .ext.toUpperCase()
    .substr(1);

export { getExt, getDataFile };
