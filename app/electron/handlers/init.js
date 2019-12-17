import { ipcMain } from 'electron';
import { walkWadDir } from '../utils/mods';
import { getJSON } from '../utils/json';

const sp = [
  {
    id: 'some-id-yeah',
    hasSavedir: false,
    hasConfig: true,
    paramSave: '',
    paramConfig: '',
    hasScreendir: false,
    paramScreen: '',
    name: 'gzDoom',
    binary: '/Applications/GZDoom.app'
  }
];

ipcMain.handle('init', async (e, args) => {
  try {
    const settings = await getJSON('settings');
    try {
      const walkedFiles = await walkWadDir(settings.data.modpath);
      return {
        error: null,
        data: {
          ...walkedFiles,
          sourceports: sp,
          settings: settings.data
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
      error: 'Cant load Settings'
    };
  }
});
