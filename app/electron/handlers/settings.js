import { ipcMain } from 'electron';

import ERRORS from '../utils/errors';
import { setJSON } from '../utils/json';

ipcMain.handle('settings/save', async (e, data) => {
  try {
    const newSettings = await setJSON('settings', data);
    return {
      data: newSettings,
      error: null
    };
  } catch (e) {
    return ERRORS.JSON_WRITE;
  }
});
