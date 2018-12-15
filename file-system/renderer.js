const { resolve } = require('path');

// helper utilities to setup the Select element
const { populateImageList, setupChangeListener } = require('../common/ui');

const BASE_PATH = resolve(__dirname, '..', 'images');

// DOM Elements on index.html
const $imageListContainer = document.getElementById('image-list-container'); 
const $content = document.getElementById('content');
const $spinner = document.getElementById('spinner');

// async/await syntax
(async () => {
  const $imageList = await populateImageList(BASE_PATH);
  setupChangeListener($imageList, BASE_PATH, $content, $spinner);
  $imageListContainer.appendChild($imageList);
})();

// same as:
// populateImageList(BASE_PATH)
//   .then(($imageList) => {
//     setupChangeListener($imageList, BASE_PATH, $content, $spinner);
//     $imageListContainer.appendChild($imageList);
//   });
