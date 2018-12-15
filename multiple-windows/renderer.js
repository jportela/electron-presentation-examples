const { ipcRenderer } = require('electron');
const { populateImageList, setupChangeListener } = require('../common/ui');

const $openButton = document.getElementById('open-button');
const $content = document.getElementById('content');
const $fileListContainer = document.getElementById('file-list-container'); 
const $spinner = document.getElementById('spinner');

ipcRenderer.on('open-directory', async (e, dirPath) => {
  $fileListContainer.innerHTML = '';
  const $imageList = await populateImageList(dirPath);
  setupChangeListener($imageList, dirPath, $content, $spinner);
  $fileListContainer.appendChild($imageList);
});

$openButton.onclick = () => {
  ipcRenderer.send('change-directory');
};
