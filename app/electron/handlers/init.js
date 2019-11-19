const { ipcMain } = require('electron');
const walk = require('../utils/walk');
const { isModFile, modItem } = require('../utils/mods');
const { getSourcePorts } = require('../models/sourceports');
const { getSettings } = require('../models/settings');

ipcMain.handle('init', async (e, args) => {
  const sourceports = await getSourcePorts();
  const settings = await getSettings();

  const mods = await walk(
    settings.modpath,
    item => item.stats.isFile() && isModFile(item.path),
    modItem
  );

  return {
    error: null,
    data: {
      mods,
      sourceports,
      settings
    }
  };
});
