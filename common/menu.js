// electron-main
// Menu templates

const { app } = require('electron');
const { learnMore } = require('./actions');

function getEditMenu() {
  return {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  };
}

function getViewMenu() {
  return {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  };
}

function getWindowMenu() {
  return {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
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
    getEditMenu(),
    getViewMenu(),
    getWindowMenu(),
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
  template.unshift(getAppMenu())

  // Edit menu
  template[2].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[4].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ];

  return template;
}

function getTemplate() {
  const template = getBaseTemplate();
  return operatingSystemDecorator(template);
}

function extendTemplateWithFileMenu(fileMenu) {
  const template = getBaseTemplate();
  template.unshift(fileMenu);
  return operatingSystemDecorator(template);
}

module.exports = {
  getTemplate,
  extendTemplateWithFileMenu,
};
