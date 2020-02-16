// Modules to control application life and create native browser window
const path = require('path');
const { app, BrowserWindow } = require('electron');

const whenProd = (whenProd, notProd) =>
  app.name.toLowerCase() === 'electron' ? notProd : whenProd;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 585,

    webPreferences: {
      nodeIntegration: true,
      webSecurity: whenProd(true, false)
    }
  });

  const url = whenProd(
    `file://${path.join(__dirname, '../production.html')}`,
    'http://localhost:1666'
  );

  mainWindow.loadURL(url);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});

require('./handlers/main');
require('./handlers/sourceports');
require('./handlers/settings');
require('./handlers/packages');
