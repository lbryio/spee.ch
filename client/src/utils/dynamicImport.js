function getDeepestChildValue (parent, childrenKeys) {
  if (!parent[childrenKeys[0]]) {
    return null;
  }
  let childKey = childrenKeys.shift();
  let child = parent[childKey];
  if (childrenKeys.length >= 1) {
    return getDeepestChildValue(child, childrenKeys);
  }
  return child;
}

export const dynamicImport = (filePath, customViews) => {
  console.log('looking for', filePath, 'in', customViews);
  // validate inputs
  if (!filePath) {
    throw new Error('no file path provided to dynamicImport()');
  }
  if (typeof filePath !== 'string') {
    throw new Error('file path provided to dynamicImport() must be a string');
  }
  if (!customViews) {
    return null;
  }
  // split out the file folders; filter out any empty or white-space-only strings
  const folders = filePath.split('/').filter(folderName => folderName.replace(/\s/g, '').length);
  // check for the component corresponding to file path in the site config object
  const component = getDeepestChildValue(customViews, folders);
  if (component) {
    console.log('found custom component for', filePath);
    return component;
  } else {
    console.log('no custom component for', filePath);
    return null;
  }
};
