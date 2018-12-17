const { BrowserWindow } = require('electron');

const windows = new Map();

function createNewWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  win.loadFile('assets/index.html');

  windows.set(win.id, win);

  win.on('close', () => {
    windows.delete(win.id);
  });
}

module.exports = {
  createNewWindow,
};
