const { app, ipcMain, Menu, BrowserWindow, protocol } = require('electron');
const { parse } = require('url');
const { createReadStream } = require('fs');

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

  protocol.registerStreamProtocol('electron-example', (req, callback) => {
    const filePath = parse(req.url).path;
    callback({
      statusCode: 200,
      headers: {
        'content-type': 'image/jpeg'
      },
      data: createReadStream(filePath),
    });
  });
});

ipcMain.on('change-directory', (e) => {
  // e.sender is a WebContents object, so we need to fetch the browser window for it
  const window = BrowserWindow.fromWebContents(e.sender);
  openDirectory(window);
});
