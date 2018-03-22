const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const getSubDirectoryNames = (root) => {
  console.log('getting sub directories for:', root);
  return readdirSync(root)
    .filter(name => {
      console.log('module found:', name);
      let fullPath = join(root, name);
      return lstatSync(fullPath).isDirectory();
    });
};

module.exports = (root) => {
  let allModules = {};
  getSubDirectoryNames(root)
    .forEach((name) => {
      console.log('importing module:', name);
      allModules[name] = require(`./${name}`).default;
    });
  return allModules;
};
