const fs = require('fs');

function readFile(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function list(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
}

module.exports = {
  readFile,
  list,
};
