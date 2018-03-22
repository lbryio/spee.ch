const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

export const getSubDirectoryNames = (root) => {
  return readdirSync(root)
    .filter(name => {
      const fullPath = join(root, name);
      return lstatSync(fullPath).isDirectory();
    });
};
