import { isAbsolute, resolve, sep, parse, join } from 'path';
import { app } from 'electron';
import { spawn } from 'child_process';
import { hostname, platform } from 'os';
import { existsSync, mkdirSync } from 'fs';

const getDataFile = file => join(app.getPath('userData'), file);

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

const play = (pack, settings) => {
  let deh = [];
  let file = [];
  let params = [];

  const { iwad, selected, sourceport, name } = pack;

  const BASEDIR = `${settings.savepath}/${sourceport.name}/${name}`;

  if (settings.savepath.trim() !== '' && !existsSync(BASEDIR)) {
    createPath(BASEDIR);
  }

  selected.forEach(i =>
    i.kind === 'DEH' ? deh.push(i.path) : file.push(i.path)
  );

  if (sourceport.hasConfig) {
    params = params.concat([
      sourceport.paramConfig,
      `${BASEDIR}/gzdoom-${hostname().replace('.local', '')}.ini`
    ]);
  }

  if (sourceport.hasSavedir) {
    params = params.concat([sourceport.paramSave, `${BASEDIR}/saves`]);
  }

  let COMMAND = ['-iwad', iwad.path, '-file', ...file];

  if (params.length > 0) {
    COMMAND = COMMAND.concat(params);
  }

  if (deh.length > 0) {
    const DEH = ['-deh', ...deh];
    COMMAND = COMMAND.concat(DEH);
  }

  if (platform() === 'darwin') {
    let MAC = [sourceport.binary, '--args'];
    COMMAND = [...MAC, ...COMMAND];
    console.log(COMMAND);
    spawn('open', COMMAND);
  } else {
    spawn(sourceport.binary, COMMAND);
  }

  return {
    data: pack,
    error: null
  };
};
export { getExt, getDataFile, play };
