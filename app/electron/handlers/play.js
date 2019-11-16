const { ipcMain } = require('electron');
const walk = require('../utils/walk');
const { isModFile, modItem } = require('../utils/mods');
const { spawn } = require('child_process');

const { getSourcePort } = require('../models/sourceports');
// ./gzdoom -iwad /Users/FreaKzero/doom/iwads/DOOM.WAD
const IWAD = '/Users/FreaKzero/doom/iwads/DOOM.WAD';

ipcMain.handle('play', async (e, args) => {
  const sp = await getSourcePort();
  const load = args.selected.map(i => i.path);
  spawn(sp.path, [sp.iwad, IWAD, sp.mod, load]);
});
