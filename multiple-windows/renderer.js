const { ipcRenderer } = require('electron');
const { populateImageList } = require('../common/ui');

const $openButton = document.getElementById('open-button');
const $content = document.getElementById('content');
const $fileListContainer = document.getElementById('file-list-container'); 
const $spinner = document.getElementById('spinner');

ipcRenderer.on('open-directory', (e, dirPath) => {
  populateImageList(dirPath, $content, $fileListContainer, $spinner);
});

$openButton.onclick = () => {
  ipcRenderer.send('change-directory');
};
