import { ipcMain } from 'electron';
import { existsSync } from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shortid from 'shortid';

import { copyfile, createPath } from '../utils/common';
import { getJSON, setJSON } from '../utils/json';
import play from '../utils/play';

ipcMain.handle('packages/play', async (e, pack) => {
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

    await play(pack, true);

    return {
      data: newpacks,
      error: null
    };
  } catch (e) {
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
      const newPackages = packages.filter(i => i.id !== id);
      if (
        removedPack.datapath &&
        removedPack.datapath.indexOf(settings.savepath) === 0 &&
        existsSync(removedPack.datapath)
      ) {
        rimraf.sync(removedPack.datapath);
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
      pack.datapath = path.join(settings.savepath, pack.sourceport, pack.id);

      if (settings.savepath.trim() !== '' && !existsSync(pack.datapath)) {
        createPath(pack.datapath);
      }

      if (
        existsSync(sourceport.configDefault) &&
        !existsSync(path.join(pack.datapath, sourceport.configFilename)) &&
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
            path.join(pack.datapath, sourceport.configFilename)
          );
        } else {
          copyfile(
            sourceport.configDefault,
            path.join(pack.datapath, sourceport.configFilename)
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
