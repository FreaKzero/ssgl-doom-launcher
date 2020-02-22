import { ipcMain } from 'electron';
import { getJSON, setJSON } from '../utils/json';
import { play } from '../utils/common';
ipcMain.handle('sourceports/save', async (e, data) => {
  try {
    const newSourceports = await setJSON('sourceports', data);
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
  const settings = await getJSON('settings');
  return play(pack, settings);
});
