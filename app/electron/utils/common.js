import { app } from 'electron';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { isAbsolute, join, parse, resolve, sep } from 'path';

const getDataFile = file => join(app.getPath('userData'), file);

const copyfile = (src, dest) => {
  createReadStream(src).pipe(createWriteStream(dest));
};

const createPath = targetDir => {
  const initDir = isAbsolute(targetDir) ? sep : '';
  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve(parentDir, childDir);
    if (!existsSync(curDir)) {
      mkdirSync(curDir);
    }

    return curDir;
  }, initDir);
};

const getExt = str =>
  parse(str)
    .ext.toUpperCase()
    .substr(1);

export { getExt, getDataFile, copyfile, createPath };
