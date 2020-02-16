import path from 'path';
import { app } from 'electron';
import { spawn } from 'child_process';
import { platform } from 'os';
const getDataFile = file => path.join(app.getPath('userData'), file);

const getExt = str =>
  path
    .parse(str)
    .ext.toUpperCase()
    .substr(1);

const play = (sourceport, selected, iwad) => {
  let deh = [];
  let file = [];

  selected.forEach(i => {
    i.kind === 'DEH' ? deh.push(i.path) : file.push(i.path);
  });

  let COMMAND = ['-iwad', iwad, '-file', ...file];

  if (deh.length > 0) {
    const DEH = ['-deh', ...deh];
    COMMAND = COMMAND.concat(DEH);
  }

  if (platform() === 'darwin') {
    let MAC = [sourceport, '--args'];
    COMMAND = [...MAC, ...COMMAND];
    spawn('open', COMMAND);
  } else {
    spawn(sourceport, COMMAND);
  }

  return {
    data: null,
    error: null
  };
};
export { getExt, getDataFile, play };
