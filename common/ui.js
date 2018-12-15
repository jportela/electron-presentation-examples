// electron-browser
// UI utilites

const { extname, join } = require('path');

const { list, readFile } = require('./fs-utils');

function selectImage(file) {
  const extension = extname(file);
  return extension === '.jpg' || extension === '.jpeg';
}

function createOption(text) {
  const $option = document.createElement('option');
  $option.textContent = text;
  return $option;
}

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

function setupChangeListener($imageList, dirPath, $content, $spinner) {
  $imageList.onchange = async (e) => {
    if (e.currentTarget.disabled) {
      return;
    }

    const fileName = $imageList.value;
  
    if (!fileName) {
      return;
    }
  
    try {
      $spinner.classList.remove('hidden');
      $content.setAttribute('src', '');
  
      const content = await readFile(join(dirPath, fileName), {
        encoding: 'base64',
      });
      $content.setAttribute('src', `data:img/jpeg;base64,${content}`);
    } catch (e) {
      console.log('Error while reading from disk', e);
      // remote.dialog.showErrorBox('Error', 'Error while reading from disk');
    } finally {
      $spinner.classList.add('hidden');
    }
  }
}

module.exports = {
  populateImageList,
  setupChangeListener,
};
