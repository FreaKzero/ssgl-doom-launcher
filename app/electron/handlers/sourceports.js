import { ipcMain } from 'electron';
import { existsSync } from 'fs';
import path from 'path';

import { NAME_UNPURE_PACKAGE } from '../constants';
import { copyfile, createPath } from '../utils/common';
import { getJSON, setJSON } from '../utils/json';
import play from '../utils/play';

ipcMain.handle('sourceports/save', async (e, data) => {
  try {
    const settings = await getJSON('settings');
    const sourceports = await getJSON('sourceports');

    const BASEPATH = path.join(settings.savepath, data.id, NAME_UNPURE_PACKAGE);
    const CONFIGPATH = path.join(BASEPATH, data.configFilename);

    if (settings.savepath.trim() !== '' && !existsSync(BASEPATH)) {
      createPath(BASEPATH);
    }

    if (
      existsSync(data.configDefault) &&
      !existsSync(CONFIGPATH) &&
      data.hasConfig
    ) {
      copyfile(data.configDefault, CONFIGPATH);
    }

    const newSourceports = await setJSON('sourceports', [data, ...sourceports]);

    return {
      data: newSourceports,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('sourceports/play', async (e, pack) => {
  try {
    if (!pack.datadir) {
      const settings = await getJSON('settings');
      pack.datapath = path.join(
        settings.savepath,
        pack.sourceport,
        NAME_UNPURE_PACKAGE
      );
    }

    await play(pack, false);

    return {
      data: [],
      error: null
    };
  } catch (e) {
    console.log(e);
    console.log(pack);
    return {
      data: null,
      error: e.message
    };
  }
});