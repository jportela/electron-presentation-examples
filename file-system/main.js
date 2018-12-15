const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#7d82b8',
  });
  mainWindow.loadFile('index.html')
});
