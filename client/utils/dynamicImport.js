const { componentsConfig } = require('../../config/siteConfig.js');

function getDeepestChildValue (parent, childrenKeys) {
  let childKey = childrenKeys.shift(); // .shift() retrieves the first element of array and removes it from array
  let child = parent[childKey];
  if (childrenKeys.length >= 1) {
    return getDeepestChildValue(child, childrenKeys);
  }
  return child;
}

export const dynamicImport = (filePath) => {
  // validate inputs
  if (!filePath) {
    throw new Error('no file path provided to dynamicImport()');
  }
  if (filePath.typeof !== 'string') {
    console.log('dynamicImport > filePath:', filePath);
    console.log('dynamicImport > filePath type:', filePath.typeof);
    throw new Error('file path provided to dynamicImport() must be a string');
  }
  // split out the file folders  // filter out any empty or white-space-only strings
  const folders = filePath.split('/').filter(folderName => folderName.replace(/\s/g, '').length);
  // check for the component corresponding to file path in the site config object
  // i.e. componentsConfig[folders[0]][folders[2][...][folders[n]]
  const customComponent = getDeepestChildValue(componentsConfig, folders);
  if (customComponent) {
    return customComponent;  // return custom component
  } else {
    return require(`${filePath}`);
  }
};
