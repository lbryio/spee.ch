const Path = require('path');
const { getSubDirectoryNames } = require('tools/getFolderNames.js');
const thisFolder = Path.resolve(__dirname, 'client/containers/');

let modules = {};

getSubDirectoryNames(thisFolder)
  .forEach((name) => {
    modules[name] = require(`./${name}`).default;
  });

module.exports = modules;
