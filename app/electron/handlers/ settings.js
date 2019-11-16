const { ipcMain } = require('electron');
const walk = require('../utils/walk');
const { isModFile, modItem } = require('../utils/mods');

ipcMain.handle('settings', async (e, args) => {
  let data;
  switch (args.action) {
    case 'load':
      data = {
        wads: '/Users/FreaKzero/doom/wads'
      };
      break;
    case 'save':
      break;
  }

  return {
    error: null,
    data: paths
  };
});
