const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const { extendTemplateWithFileMenu } = require('../common/menu');
const { openDirectory } = require('../common/actions');

let mainWindow;

const menuTemplate = extendTemplateWithFileMenu({
  label: 'File',
  submenu: [{
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click: () => openDirectory(mainWindow),
  }]
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  mainWindow.loadFile('index.html');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

ipcMain.on('change-directory', () => {
  if (!mainWindow) {
    return;
  }

  openDirectory(mainWindow);
});
