const { ipcRenderer } = require('electron');
const { extname, join } = require('path');

const { readFile, list } = require('./fs-utils');

const $content = document.getElementById('content');
const $fileList = document.getElementById('file-list'); 
const $spinner = document.getElementById('spinner');
const $changeButton = document.getElementById('change-button');

let basePath;

$fileList.onchange = async () => {
  const fileName = $fileList.value;

  if (!fileName) {
    return;
  }

  try {
    $spinner.classList.remove('hidden');
    $content.setAttribute('src', '');

    const content = await readFile(join(basePath, fileName), {
      encoding: 'base64',
    });
    $content.setAttribute('src', `data:img/jpeg;base64,${content}`);
  } catch (e) {
    console.log('Error while reading from disk', e);
  } finally {
    $spinner.classList.add('hidden');
  }
}

async function populateImageList(dirPath) {
  basePath = dirPath;
  const files = await list(dirPath);

  $fileList.innerHTML = '';

  files
    .filter(file => extname(file) === '.jpg')
    .forEach(file => {
      const $element = document.createElement('option');
      $element.textContent = file;
      $fileList.append($element);
    });
}

ipcRenderer.on('open-directory', (e, dirPath) => {
  populateImageList(dirPath);
});

$changeButton.onclick = () => {
  ipcRenderer.send('change-directory');
}