const { BrowserWindow, dialog, shell } = require('electron')

function openDirectory() {
  const [window] = BrowserWindow.getAllWindows();
  dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
  }, (filePaths) => {
    if (filePaths && filePaths.length > 0) {
      window.webContents.send('open-directory', filePaths[0]);
    }
  });
}

function learnMore() {
  shell.openExternal('https://github.com/jportela/electron-presentation-examples');
}

module.exports = {
  learnMore,
  openDirectory,
}