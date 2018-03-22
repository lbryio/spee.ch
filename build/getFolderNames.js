const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

export const getSubDirectoryNames = (root) => {
  return readdirSync(root)
    .filter(name => {
      let fullPath = join(root, name);
      return lstatSync(fullPath).isDirectory();
    });
};
