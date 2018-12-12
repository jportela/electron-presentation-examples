
const { extname, join } = require('path');

const { readFile, list } = require('./fs-utils');

async function populateImageList(dirPath, $content, $fileListContainer, $spinner) {
  $fileListContainer.innerHTML = '';

  const files = await list(dirPath);

  const $fileList = document.createElement('select');

  const firstOption = document.createElement('option');
  firstOption.textContent = dirPath;
  firstOption.disabled = true;
  firstOption.selected = true;

  $fileList.append(firstOption);

  files
    .filter(file => extname(file) === '.jpg')
    .forEach(file => {
      const $element = document.createElement('option');
      $element.textContent = file;
      $fileList.append($element);
    });

  $fileList.onchange = async (e) => {
    if (e.currentTarget.disabled) {
      return;
    }

    const fileName = $fileList.value;
  
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
    } finally {
      $spinner.classList.add('hidden');
    }
  }

  $fileListContainer.append($fileList);
}

module.exports = {
  populateImageList,
};
