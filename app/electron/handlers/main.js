import { ipcMain } from 'electron';

import ERRORS from '../utils/errors';
import { getJSON } from '../utils/json';
import { walkWadDir } from '../utils/mods';

ipcMain.handle('main/init', async () => {
  try {
    const settings = await getJSON('settings');
    const sourceports = (await getJSON('sourceports')) || [];
    const packages = (await getJSON('packages')) || [];

    try {
      const walkedFiles = await walkWadDir(settings.modpath);
      return {
        error: null,
        data: {
          ...walkedFiles,
          sourceports: sourceports,
          settings: settings,
          packages: packages
        }
      };
    } catch (e) {
      return {
        data: null,
        error: e.message
      };
    }
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});
