const Path = require('path');
const { getSubDirectoryNames } = require('build/getFolderNames.js');
const thisFolder = Path.resolve(__dirname, 'client/pages/');

let modules = {};

getSubDirectoryNames(thisFolder)
  .forEach((name) => {
    modules[name] = require(`./${name}`).default;
  });

module.exports = modules;
