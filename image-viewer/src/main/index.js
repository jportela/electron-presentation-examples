const { app, ipcMain, Menu, BrowserWindow } = require('electron');

const { getTemplate } = require('./menu');
const { openDirectory } = require('./actions');
const { createNewWindow } = require('./windows')

const menuTemplate = getTemplate();

app.on('ready', () => {
  createNewWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  // require('./protocol').registerElectronExampleProtocol();
});

ipcMain.on('change-directory', (e) => {
  // e.sender is a WebContents object, so we need to fetch the browser window for it
  const win = BrowserWindow.fromWebContents(e.sender);
  openDirectory(win);
});
