import { ipcMain } from 'electron';
import { setJSON } from '../utils/json';

ipcMain.handle('settings/save', async (e, data) => {
  const newSettings = await setJSON('settings', data);
  return {
    error: null,
    data: newSettings
  };
});
