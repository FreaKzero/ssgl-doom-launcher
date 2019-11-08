const { ipcMain } = require('electron');

ipcMain.handle('wat', (e, args) => {
  return { data: 'wurx' };
});
