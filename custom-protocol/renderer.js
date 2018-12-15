const { ipcRenderer } = require('electron');
const { join } = require('path');

const { populateImageList } = require('../common/ui');

const $openButton = document.getElementById('open-button');
const $content = document.getElementById('content-container');
const $imageListContainer = document.getElementById('image-list-container'); 
const $spinner = document.getElementById('spinner');

ipcRenderer.on('open-directory', async (e, dirPath) => {
  $imageListContainer.innerHTML = '';
  const $imageList = await populateImageList(dirPath);
  setupChangeListener($imageList, dirPath, $content, $spinner);
  $imageListContainer.appendChild($imageList);
});

$openButton.onclick = () => {
  ipcRenderer.send('change-directory');
};

function setupChangeListener($imageList, dirPath, $content, $spinner) {
  $imageList.onchange = async (e) => {
    if (e.currentTarget.disabled) {
      return;
    }

    const fileName = $imageList.value;

    if (!fileName) {
      return;
    }

    $content.innerHTML = '';
    $spinner.classList.remove('hidden');
    const $imageContent = new Image();
    $imageContent.src = `electron-example://${join(dirPath, fileName)}`;
    $imageContent.id = 'content';

    await $imageContent.decode();

    $content.appendChild($imageContent);

    $spinner.classList.add('hidden');
  }
}