const klawSync = require('klaw-sync');

let paths;
try {
  paths = klawSync('/Users/FreaKzero/doom/wads', { nodir: true }).map(item => {
    const spl = item.path.split('/');
    const wat = spl[spl.length - 1].split('.');
    return {
      name: wat[0],
      kind: wat[1],
      path: item.path,
      size: item.stats.size,
      date: item.stats.birthtimeMs
    };
  });
} catch (er) {
  console.error(er);
}
console.log(paths);
