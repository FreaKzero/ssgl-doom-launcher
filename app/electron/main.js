// Modules to control application life and create native browser window
const path = require('path');
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 580,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../index.html')}`;

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
require('./handlers/settings');
require('./handlers/play');
