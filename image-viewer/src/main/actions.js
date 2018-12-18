// Actions

const { BrowserWindow, dialog, shell } = require('electron')

// create a new Browser Window
function createNewWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  win.loadFile('assets/index.html');
}


// shows a dialog, for opening a directory
function openDirectory(sender) {
  dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
  }, (filePaths) => {
    if (filePaths && filePaths.length === 1) {
      sender.send('open-directory', filePaths[0]);
    }
  });
}

// opens the default browser, pointing to this example repo
function learnMore() {
  shell.openExternal('https://github.com/jportela/electron-presentation-examples');
}

module.exports = {
  createNewWindow,
  learnMore,
  openDirectory,
};
