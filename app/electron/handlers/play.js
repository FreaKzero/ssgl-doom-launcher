const { ipcMain } = require('electron');
const walk = require('../utils/walk');
const { getSettings } = require('../utils/common');
const { spawn } = require('child_process');

//const { getSourcePort } = require('../models/sourceports');
// ./gzdoom -iwad /Users/FreaKzero/doom/iwads/DOOM.WAD
//const IWAD = '/Users/FreaKzero/doom/iwads/DOOM.WAD';

ipcMain.handle('play', async (e, args) => {
  const set = getSettings();
  const load = args.selected.map(i => i.path);
  spawn(set.portpath, ['-iwad', set.iwad, '-file', load]);
});
