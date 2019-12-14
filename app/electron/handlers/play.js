import { ipcMain } from 'electron';
import { spawn } from 'child_process';
import { getJSON } from '../utils/json';
import { platform } from 'os';
//const { getSourcePort } = require('../models/sourceports');
// ./gzdoom -iwad /Users/FreaKzero/doom/iwads/DOOM.WAD
//const IWAD = '/Users/FreaKzero/doom/iwads/DOOM.WAD';

ipcMain.handle('play', async (e, args) => {
  const set = await getJSON('settings');
  const load = args.selected.map(i => i.path);
  if (platform() === 'darwin') {
    spawn('open', [
      set.data.portpath,
      '--args',
      '-iwad',
      args.iwad,
      '-file',
      ...load
    ]);
  } else {
    spawn(set.data.portpath, ['-iwad', args.iwad, '-file', ...load]);
  }
});
