const { app, Menu } = require('electron');
const { shell } = require('electron');
const isMac = process.platform === 'darwin';


// {
//   label: 'Join Discord',
//   click: async () => {
//     await shell.openExternal('https://discord.gg/MsjZhHF');
//   }
// },
// {
//   label: 'Open Github',
//   click: async () => {
//     await shell.openExternal('https://github.com/FreaKzero/ssgl-doom-launcher');
//   }
// },

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
  }
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
