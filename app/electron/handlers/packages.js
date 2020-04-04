import { ipcMain, shell } from 'electron';
import { existsSync } from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shortid from 'shortid';

import { copyfile, createPath } from '../utils/common';
import { getJSON, setJSON } from '../utils/json';
import play from '../utils/play';

ipcMain.handle('packages/open', async (e, data) => {
  try {
    const settings = await getJSON('settings');
    shell.openItem(path.join(settings.savepath, data.path));

    return {
      data: null,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('packages/play', async (e, data) => {
  const { load, pack, oblige } = data;
  try {
    const packages = await getJSON('packages');
    const newpacks = packages.map(item => {
      if (pack.id === item.id) {
        return {
          ...item,
          lastplayed: Date.now()
        };
      } else {
        return item;
      }
    });

    setJSON('packages', newpacks);

    await play(pack, load, oblige);

    return {
      data: newpacks,
      error: null
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('packages/delete', async (e, id) => {
  try {
    const packages = await getJSON('packages');
    const settings = await getJSON('settings');
    const removedPack = packages.find(i => i.id === id);

    if (removedPack) {
      const DATAPATH = path.join(settings.savepath, removedPack.datapath);
      const newPackages = packages.filter(i => i.id !== id);

      if (DATAPATH && DATAPATH && existsSync(DATAPATH)) {
        rimraf.sync(DATAPATH);
      }

      await setJSON('packages', newPackages);

      return {
        data: newPackages,
        error: null
      };
    } else {
      return {
        data: packages,
        error: null
      };
    }
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('packages/save', async (e, pack) => {
  try {
    const packages = await getJSON('packages');
    const settings = await getJSON('settings');
    const sourceports = await getJSON('sourceports');
    const sourceport = sourceports.find(port => pack.sourceport === port.id);

    if (pack.id) {
      const newPackages = packages.map(item => {
        return item.id === pack.id ? { ...item, ...pack } : item;
      });

      await setJSON('packages', newPackages);

      return {
        data: {
          packages: newPackages,
          package: pack
        },
        error: null
      };
    } else {
      pack.id = shortid.generate();
      pack.datapath = path.join(pack.sourceport, pack.id);

      const DATAPATH = path.join(settings.savepath, pack.datapath);
      if (settings.savepath.trim() !== '' && !existsSync(DATAPATH)) {
        createPath(DATAPATH);
      }

      if (
        existsSync(sourceport.configDefault) &&
        !existsSync(path.join(DATAPATH, sourceport.configFilename)) &&
        sourceport.hasConfig
      ) {
        if (pack.copy) {
          const copyPath = path.join(
            settings.savepath,
            pack.sourceport,
            pack.copy
          );

          copyfile(
            path.join(copyPath, sourceport.configFilename),
            path.join(DATAPATH, sourceport.configFilename)
          );
        } else {
          copyfile(
            sourceport.configDefault,
            path.join(DATAPATH, sourceport.configFilename)
          );
        }
      }
    }

    const newPackages = [pack, ...packages];

    await setJSON('packages', newPackages);

    return {
      data: {
        packages: newPackages,
        package: pack
      },
      error: null
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: e.message
    };
  }
});
