const { BrowserWindow } = require('electron');

const windows = new Map();

function createNewWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  window.loadFile('index.html');
  windows.set(window.id, window);
}

module.exports = {
  createNewWindow,
};
