import fs from 'fs';
import { getDataFile } from './common';

const getJSON = path => {
  const file = `${getDataFile(path)}.json`;
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(file)) {
      return resolve([]);
    }
    return fs.readFile(file, 'utf8', (err, data) => {
      try {
        const parsed = JSON.parse(data, null, 2);
        return err ? reject(new Error(err)) : resolve(parsed);
      } catch (jsonerror) {
        return reject(new Error(jsonerror));
      }
    });
  });
};

const setJSON = (path, data) => {
  
  const file = `${getDataFile(path)}.json`;
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const json = JSON.stringify(data, null, 2);
      return fs.writeFile(file, json, err =>
        err ? reject(new Error(err)) : resolve(data)
      );
    } catch (jsonerror) {
      return reject(new Error(jsonerror));
    }
  });
};

export { getJSON, setJSON };
