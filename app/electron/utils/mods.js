import { getExt } from './common';
import path from 'path';
import uuid from 'uuid-quick';
import byteSize from 'byte-size';
import klaw from 'klaw';
import { AVAILABLE_IWADS, MOD_EXTENSIONS } from '../constants';

const walkWadDir = dir => {
  if (!dir || dir.trim() === '') {
    throw new Error('WAD Directory is not set');
  }

  const mods = [];
  const iwads = [];
  const filter = item => {
    const basename = path.basename(item);
    return basename === '.' || basename[0] !== '.';
  };

  return new Promise((resolve, reject) => {
    return klaw(dir, { depthLimit: -1, filter })
      .on('readable', function() {
        let item;
        while ((item = this.read())) {
          if (item.stats.isFile()) {
            const checkname = path
              .parse(item.path)
              .name.replace(/_/g, ' ')
              .toLowerCase();

            if (AVAILABLE_IWADS.indexOf(checkname) > -1) {
              iwads.push(IWADItem(item));
            } else if (isModFile(item.path)) {
              mods.push(modItem(item));
            }
          }
        }
      })
      .on('end', () => resolve({ mods, iwads }))
      .on('error', err => reject(err.message));
  });
};

const IWADItem = item => {
  const sz = byteSize(item.stats.size);
  return {
    id: uuid(),
    name: path.parse(item.path).name.replace(/_/g, ' '),
    kind: getExt(item.path),
    path: item.path,
    size: `${sz.value} ${sz.unit}`,
    date: item.stats.birthtimeMs,
    active: false
  };
};

const isModFile = item => {
  const EXT = path
    .parse(item)
    .ext.toUpperCase()
    .trim()
    .substr(1);

  return MOD_EXTENSIONS.indexOf(EXT) > -1;
};

const modItem = item => {
  const sz = byteSize(item.stats.size);
  return {
    id: uuid(),
    lastdir: path.basename(path.dirname(item.path)).toLowerCase(),
    name: path.parse(item.path).name.replace(/_/g, ' '),
    kind: getExt(item.path),
    path: item.path,
    size: `${sz.value} ${sz.unit}`,
    date: item.stats.birthtimeMs,
    active: false
  };
};

export { modItem, isModFile, walkWadDir };
