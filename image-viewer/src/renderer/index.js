const { ipcRenderer } = require('electron');
const { populateImageList, setupChangeListener } = require('./ui');

const $imageListContainer = document.getElementById('image-list-container'); 
const $openButton = document.getElementById('open-button');
const $spinner = document.getElementById('spinner');
const $imageContainer = document.getElementById('image-container');

$openButton.onclick = () => {
  ipcRenderer.send('change-directory');
};

ipcRenderer.on('open-directory', async (e, dirPath) => {
  // cleans the select element
  $imageListContainer.innerHTML = '';
  // builds the select element
  const $imageList = await populateImageList(dirPath);
  setupChangeListener($imageList, dirPath, $imageContainer, $spinner);
  $imageListContainer.appendChild($imageList);
});
