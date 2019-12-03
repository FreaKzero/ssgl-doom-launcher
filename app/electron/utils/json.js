import fs from 'fs';
import { getDataFile } from './common';

const getJSON = path => {
  const json = `${getDataFile(path)}.json`;
  return new Promise((resolve, reject) => {
    return fs.readFile(json, 'utf8', (err, data) => {
      try {
        const parsed = JSON.parse(data, null, 2);
        return err
          ? reject({ error: err, data: {} })
          : resolve({ error: null, data: parsed });
      } catch (jsonerror) {
        return reject({ data: null, error: jsonerror });
      }
    });
  });
};

const setJSON = (path, data) => {
  const file = `${getDataFile(path)}.json`;
  return new Promise((resolve, reject) => {
    try {
      const json = JSON.stringify(data, null, 2);
      return fs.writeFile(file, json, err =>
        err
          ? reject({ error: err, data: null })
          : resolve({ error: null, data: data })
      );
    } catch (jsonerror) {
      return reject({ error: jsonerror, data: null });
    }
  });
};

export { getJSON, setJSON };
