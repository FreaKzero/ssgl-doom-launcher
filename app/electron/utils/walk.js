const klaw = require('klaw');
const path = require('path');

const walk = (dir, filterCallback, transformCallback) => {
  const paths = [];

  const filter = item => {
    const basename = path.basename(item);
    return basename === '.' || basename[0] !== '.';
  };

  return new Promise((resolve, reject) => {
    return klaw(dir, { depthLimit: -1, filter })
      .on('readable', function() {
        let item;
        let transformed = null;
        while ((item = this.read())) {
          if (transformCallback) {
            transformed = transformCallback(item);
          }

          if (filterCallback) {
            if (filterCallback(item)) {
              paths.push(transformed ? transformed : item);
            }
          } else {
            paths.push(item);
          }
        }
      })
      .on('end', () => resolve(paths))
      .on('error', err => reject(err.message));
  });
};

module.exports = walk;
