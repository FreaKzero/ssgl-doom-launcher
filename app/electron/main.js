// Modules to control application life and create native browser window
const path = require('path');
const { app, BrowserWindow } = require('electron');

const whenProd = (whenProd, notProd) =>
  process.env.NODE_ENV === 'production' ? whenProd : notProd;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 580,

    webPreferences: {
      nodeIntegration: true,
      webSecurity: whenProd(true, false)
    }
  });

  const url = whenProd(
    `file://${path.join(__dirname, '../index.html')}`,
    'http://localhost:8080'
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

require('./handlers/init');
require('./handlers/play');
require('./handlers/settings');
