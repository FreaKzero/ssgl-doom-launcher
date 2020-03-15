import { ipcMain } from 'electron';

import ERRORS from '../utils/errors';
import { setJSON } from '../utils/json';

ipcMain.handle('packages/save', async (e, data) => {
  try {
    const newPackages = await setJSON('packages', data);
    return {
      data: newPackages,
      error: null
    };
  } catch (e) {
    return ERRORS.JSON_WRITE;
  }
});
