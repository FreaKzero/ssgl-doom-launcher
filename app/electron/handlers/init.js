import { ipcMain } from 'electron';
import { walkWadDir } from '../utils/mods';
import { getJSON } from '../utils/json';
import { getDataFile } from '../utils/common';

ipcMain.handle('init', async (e, args) => {
  try {
    const settings = await getJSON('settings');
    const walkedFiles = await walkWadDir(settings.data.modpath);
    return {
      error: null,
      data: {
        ...walkedFiles,
        sourceports: [],
        settings: settings.data
      }
    };
  } catch (e) {
    return {
      error: e.message
    };
  }
});
