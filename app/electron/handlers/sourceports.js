import { ipcMain } from 'electron';
import { spawn } from 'child_process';
import { getJSON, setJSON } from '../utils/json';
import { platform } from 'os';

ipcMain.handle('sourceports/save', async (e, data) => {
  try {
    const newSourceports = await setJSON('sourceports', data);
    return {
      data: newSourceports,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('sourceports/play', async (e, args) => {
  let deh = [];
  let file = [];

  args.selected.forEach(i => {
    i.kind === 'DEH' ? deh.push(i.path) : file.push(i.path);
  });

  let COMMAND = ['-iwad', args.iwad, '-file', ...file];

  if (deh.length > 0) {
    const DEH = ['-deh', ...deh];
    COMMAND = COMMAND.concat(DEH);
  }

  if (platform() === 'darwin') {
    let MAC = [args.sourceport.binary, '--args'];
    COMMAND = [...MAC, ...COMMAND];
    spawn('open', COMMAND);
  } else {
    spawn(args.sourceport.binary, COMMAND);
  }
});
