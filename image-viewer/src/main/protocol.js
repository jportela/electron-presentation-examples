const { createReadStream } = require('fs');
const { parse } = require('url');
const { protocol } = require('electron');

function registerElectronExampleProtocol() {
  protocol.registerStreamProtocol('electron-example', (req, callback) => {
    const filePath = parse(req.url).path;
    callback({
      statusCode: 200,
      headers: {
        'content-type': 'image/jpeg'
      },
      data: createReadStream(filePath),
    });
  });
}

module.exports = {
  registerElectronExampleProtocol,
};
