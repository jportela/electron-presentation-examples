const { ipcRenderer } = require('electron');
const { populateImageList, setupChangeListener } = require('./ui');

const $openButton = document.getElementById('open-button');
const $imageContainer = document.getElementById('image-container');
const $fileListContainer = document.getElementById('file-list-container'); 
const $spinner = document.getElementById('spinner');

ipcRenderer.on('open-directory', async (e, dirPath) => {
  $fileListContainer.innerHTML = '';
  const $imageList = await populateImageList(dirPath);
  setupChangeListener($imageList, dirPath, $imageContainer, $spinner);
  $fileListContainer.appendChild($imageList);
});

$openButton.onclick = () => {
  ipcRenderer.send('change-directory');
};
