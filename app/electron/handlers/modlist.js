const { ipcMain } = require('electron');
const walk = require('../utils/walk');
const { isModFile, modItem } = require('../utils/mods');
const TEST = '/Users/thomas.petrovic/priv/ssgl-doom-launcher/app/wad';

ipcMain.handle('modlist', async (e, args) => {
  const paths = await walk(
    TEST,
    item => item.stats.isFile() && isModFile(item.path),
    modItem
  );

  return {
    error: null,
    data: paths
  };
});
