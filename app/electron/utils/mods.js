import byteSize from 'byte-size';
import klaw from 'klaw';
import path from 'path';

import { AVAILABLE_IWADS, MOD_EXTENSIONS } from '../constants';
import { getExt } from './common';

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
        iwads.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      })
      .on('end', () => resolve({ mods, iwads }))
      .on('error', err => reject(err.message));
  });
};

const genIndexedID = item =>
  `${item.path}${item.size}${item.kind}`
    .replace(/[\W_]+/g, '')
    .split('')
    .map((c, i) => {
      return i % 2 === 0 ? c.toLowerCase() : '';
    })
    .join('') + `${item.stats.birthtimeMs}`;

const IWADItem = item => {
  const sz = byteSize(item.stats.size);
  return {
    id: genIndexedID(item),
    name: path.parse(item.path).name.replace(/_/g, ' '),
    kind: getExt(item.path),
    path: item.path,
    size: `${sz.value} ${sz.unit}`,
    created: item.stats.birthtimeMs,
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
    id: genIndexedID(item),
    lastdir: path.basename(path.dirname(item.path)).toLowerCase(),
    name: path.parse(item.path).name.replace(/_/g, ' '),
    kind: getExt(item.path),
    path: item.path,
    size: `${sz.value} ${sz.unit}`,
    created: item.stats.birthtimeMs,
    active: false
  };
};

export { modItem, isModFile, walkWadDir };
