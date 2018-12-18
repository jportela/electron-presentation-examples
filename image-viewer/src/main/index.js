const { app, ipcMain, Menu, BrowserWindow } = require('electron');

const { getTemplate } = require('./menu');
const { createNewWindow, openDirectory } = require('./actions');

const menuTemplate = getTemplate();

app.on('ready', () => {
  createNewWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  // require('./protocol').registerElectronExampleProtocol();
});

ipcMain.on('change-directory', (e) => {
  openDirectory(e.sender);
});
