const { app, Menu } = require('electron');
const { shell } = require('electron');
const isMac = process.platform === 'darwin';
const { getDataFile } = require('./utils/common');
const fs = require('fs');
const { open } = require('./utils/oblige');

let hasSettings = false;
let settings = {};
const settingsPath = getDataFile('settings.json');

if (fs.existsSync(settingsPath)) {
  hasSettings = true;
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
}

const openFromSettings = async property => {
  try {
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

const createMenu = (win, url) => {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
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
      label: 'Open',
      submenu: [
        ...(hasSettings
          ? [
              {
                label: 'Mod Directory',
                click: () => openFromSettings('modpath')
              },
              {
                label: 'SSGL Data Directory',
                click: () => openFromSettings('savepath')
              }
            ]
          : []),
        ...(hasSettings && settings.obligeActive
          ? [
              { type: 'separator' },
              {
                label: 'Oblige',
                click: () => open('binary')
              },
              {
                label: 'Oblige Config Directory',
                click: () => open('configs')
              }
            ]
          : []),

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
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            win.webContents.executeJavaScript(`
              location.assign('#/about');`);
          }
        },
        {
          label: 'Open First Setup Guide',
          click: async () => {
            await shell.openExternal(
              'https://github.com/FreaKzero/ssgl-doom-launcher/wiki/SSGL---First-Setup'
            );
          }
        }
      ]
    }
  ];

  return Menu.buildFromTemplate(template);
};

module.exports = createMenu;
