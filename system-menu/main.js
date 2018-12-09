const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const { getTemplate } = require('./menu');
const { openDirectory } = require('./actions');

const menuTemplate = getTemplate();

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  mainWindow.loadFile('index.html');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

ipcMain.on('change-directory', () => {
  openDirectory();
});
