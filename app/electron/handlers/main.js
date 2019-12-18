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

ipcMain.handle('main/init', async (e, args) => {
  const sourceports = (await getJSON('sourceports')) || [];

  try {
    const settings = await getJSON('settings');
    try {
      const walkedFiles = await walkWadDir(settings.modpath);
      return {
        error: null,
        data: {
          ...walkedFiles,
          sourceports: sourceports,
          settings: settings
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
