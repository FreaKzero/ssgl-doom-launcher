import { ipcMain } from 'electron';

import { build, getConfigs, open } from '../utils/oblige';

ipcMain.handle('oblige/open', async (e, args) => {
  return open(args);
});

ipcMain.handle('oblige/configs', async () => {
  const x = await getConfigs();
  return {
    data: x,
    error: null
  };
});

ipcMain.handle('oblige/build', async (e, data) => {
  try {
    return await build(data.config, data.pack);
  } catch (e) {
    return {
      data: null,
      error: e
    };
  }
});
