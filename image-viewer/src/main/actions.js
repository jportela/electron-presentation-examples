// Utilities for Menus

const { dialog, shell } = require('electron')

// shows a dialog, for opening a directory
function openDirectory(window) {
  if (!window) {
    return;
  }
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
};
