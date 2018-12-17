// UI utilites

const { extname, join } = require('path');

const { list, readFile } = require('../common/fs-utils');

// selects files with extension .jpg or .jpeg
function selectImage(file) {
  const extension = extname(file);
  return extension === '.jpg' || extension === '.jpeg';
}

// creates an <option> HTML element
function createOption(text) {
  const $option = document.createElement('option');
  $option.textContent = text;
  return $option;
}

// creates the <select> element, populated with images from a specific path
async function populateImageList(dirPath) {
  // obtain the file list from a directory
  const files = await list(dirPath);

  const $imageList = document.createElement('select');

  // first option, to indicate what directory is loaded
  const $firstOption = createOption(dirPath);
  $firstOption.disabled = true;
  $firstOption.selected = true;
  $imageList.append($firstOption);

  files
    .filter(selectImage) // only select JPEG files
    .map(createOption)
    .forEach(($option) => $imageList.append($option));
  
  return $imageList;
}

function setupChangeListener($imageList, dirPath, $imageContainer, $spinner) {
  $imageList.onchange = async (e) => {
    // if the first option is selected, skip
    if (e.target.disabled) {
      return;
    }

    // shouldn't really happen, but defensive code is good
    const fileName = e.target.value;
  
    if (!fileName) {
      return;
    }

    const filePath = join(dirPath, fileName);

    // shows the spinner and clears the previous image
    $spinner.classList.remove('hidden');
    $imageContainer.innerHTML = '';

    const $content = await renderImage(filePath);

    if ($content) {
      $imageContainer.appendChild($content);
    }
    
    // hides the spinner when image finishes rendering
    $spinner.classList.add('hidden');
  }
}

async function renderImage(filePath) {
  const $content = document.createElement('img');
  try {
    const buffer = await readFile(filePath, {
      encoding: 'base64',
    });
    $content.src = `data:img/jpeg;base64,${buffer}`;
    $content.id = 'content';
  } catch (e) {
    console.log('Error while reading from disk', e);
    // remote.dialog.showErrorBox('Error', 'Error while reading from disk');
    return null;
  }
  return $content;
}

module.exports = {
  populateImageList,
  setupChangeListener,
};

async function renderImageV2(filePath) {
  const $content = new Image();
  $content.src = `electron-example://${filePath}`;
  $content.id = 'content';

  await $content.decode();

  return $content;
}