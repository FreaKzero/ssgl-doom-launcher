import { spawn } from 'child_process';
import { existsSync, readdirSync, statSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';

import { copyfile, createPath } from './common';

const getLastSaveGame = dir => {
  if (!existsSync(dir)) {
    return null;
  }

  // const latestSave = getLastSaveGame(`${BASEDIR}/saves`);
  // COMMAND = COMMAND.concat(['-loadgame', latestSave]);

  const files = readdirSync(dir);
  return files
    .map(name => {
      const p = join(dir, name);
      return { path: p, ctime: statSync(p).ctime };
    })
    .sort((a, b) => b.ctime - a.ctime)[0].path;
};

const play = (pack, settings) => {
  let deh = [];
  let bex = [];
  let file = [];
  let params = [];
  const { iwad, selected, sourceport, id } = pack;

  const BASEDIR = `${settings.savepath}/${sourceport.name}/${id}`;

  if (settings.savepath.trim() !== '' && !existsSync(BASEDIR)) {
    createPath(BASEDIR);
  }

  if (
    existsSync(sourceport.configDefault) &&
    !existsSync(`${BASEDIR}/${sourceport.configFilename}`) &&
    sourceport.hasConfig
  ) {
    copyfile(
      sourceport.configDefault,
      `${BASEDIR}/${sourceport.configFilename}`
    );
  }

  selected.forEach(i => {
    switch (i.kind) {
      case 'DEH':
        deh.push(i.path);
        break;
      case 'BEX':
        bex.push(i.path);
        break;
      default:
        file.push(i.path);
    }
  });

  if (sourceport.hasConfig) {
    params = params.concat([
      sourceport.paramConfig,
      `${BASEDIR}/${sourceport.configFilename}`
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
    COMMAND = COMMAND.concat(['-deh', ...deh]);
  }

  if (bex.length > 0) {
    COMMAND = COMMAND.concat(['-bex', ...bex]);
  }

  if (platform() === 'darwin') {
    let MAC = [sourceport.binary, '--args'];
    COMMAND = [...MAC, ...COMMAND];
    spawn('open', COMMAND);
  } else {
    spawn(sourceport.binary, COMMAND);
  }

  return {
    data: pack,
    error: null
  };
};

export default play;
