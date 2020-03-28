const { app, Menu } = require('electron');
const { shell } = require('electron');
const isMac = process.platform === 'darwin';
const { getJSON } = require('./utils/json');
const { getDataFile } = require('./utils/common');

const openFromSettings = async property => {
  try {
    const settings = await getJSON('settings');
    shell.openItem(settings[property]);
  } catch (e) {
    console.log(e);
  }
};

const openApplicationSettings = async () => {
  try {
    shell.openItem(getDataFile(''));
  } catch (e) {
    console.log(e);
  }
};

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []),
  {
    label: 'Directories',
    submenu: [
      {
        label: 'Mod Directory',
        click: () => openFromSettings('modpath')
      },
      {
        label: 'SSGL Data Directory',
        click: () => openFromSettings('savepath')
      },
      { type: 'separator' },
      {
        label: 'Application Directory',
        click: openApplicationSettings
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [{ role: 'delete' }, { role: 'selectAll' }, { type: 'separator' }]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [{ type: 'separator' }, { role: 'front' }]
        : [{ role: 'close' }])
    ]
  },
  {
    label: 'Community',
    submenu: [
      {
        label: 'Join Discord',
        click: async () => {
          await shell.openExternal('https://discord.gg/MsjZhHF');
        }
      },
      {
        label: 'Open Github',
        click: async () => {
          await shell.openExternal(
            'https://github.com/FreaKzero/ssgl-doom-launcher'
          );
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
