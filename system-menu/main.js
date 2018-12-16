const { app, ipcMain, Menu, BrowserWindow } = require('electron');

const { extendTemplateWithFileMenu } = require('../common/menu');
const { openDirectory } = require('../common/actions');
const { createNewWindow } = require('./windows')

const menuTemplate = extendTemplateWithFileMenu({
  label: 'File',
  submenu: [{
    label: 'New',
    accelerator: 'CmdOrCtrl+N',
    click: () => createNewWindow(),
  },
  {
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click: (menuItem, window) => openDirectory(window),
  }]
});

app.on('ready', () => {
  createNewWindow();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

ipcMain.on('change-directory', (e) => {
  // e.sender is a WebContents object, so we need to fetch the browser window for it
  const window = BrowserWindow.fromWebContents(e.sender);
  openDirectory(window);
});
