const { ipcMain } = require('electron');
const { saveSettings } = require('../models/settings');

ipcMain.handle('settings/save', async (e, data) => {
  const newSettings = await saveSettings(data);
  return {
    error: null,
    data: newSettings
  };
});
