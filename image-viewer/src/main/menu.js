// Menu templates

const { app } = require('electron');
const { createNewWindow, learnMore, openDirectory } = require('./actions');

function getFileMenu() {
  return {
    label: 'File',
    submenu: [{
      label: 'New',
      accelerator: 'CmdOrCtrl+N',
      click: () => createNewWindow(),
    },
    {
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click: (menuItem, win) => {
        if (!win) {
          return;
        }
        openDirectory(win.webContents);
      },
    }]
  };
}


function getViewMenu() {
  return {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
    ]
  };
}

function getHelpMenu() {
  return {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: learnMore,
      }
    ]
  };
}

function getBaseTemplate() {
  return [
    getFileMenu(),
    getViewMenu(),
    getHelpMenu(),
  ];
}

function getAppMenu() {
  return {
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  };
}

function operatingSystemDecorator(template) {
  if (process.platform !== 'darwin') {
    return;
  }

  // add the App menu to the top
  template.unshift(getAppMenu());

  return template;
}

function getTemplate() {
  const template = getBaseTemplate();
  return operatingSystemDecorator(template);
}

module.exports = {
  getTemplate,
};
