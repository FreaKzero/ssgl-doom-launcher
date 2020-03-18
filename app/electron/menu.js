const { app, Menu } = require('electron');

const menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
      { type: 'separator' },
      {
        label: 'Exit',
        click() {
          app.quit();
        }
      }
    ]
  }
]);

module.exports = menu;
