// using the app and BrowserWindow APIs from electron
// check the docs on https://electronjs.org/docs/api
const { app, BrowserWindow } = require('electron');

// wait for Electron to initialize
app.on('ready', () => {
  // create a new window
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadFile('index.html')
});
