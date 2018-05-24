"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicImport = void 0;

function getDeepestChildValue(parent, childrenKeys) {
  if (!parent[childrenKeys[0]]) {
    return null;
  }

  var childKey = childrenKeys.shift();
  var child = parent[childKey];

  if (childrenKeys.length >= 1) {
    return getDeepestChildValue(child, childrenKeys);
  }

  return child;
}

var dynamicImport = function dynamicImport(filePath, customViews) {
  console.log('looking for', filePath, 'in', customViews); // validate inputs

  if (!filePath) {
    throw new Error('no file path provided to dynamicImport()');
  }

  if (typeof filePath !== 'string') {
    throw new Error('file path provided to dynamicImport() must be a string');
  }

  if (!customViews) {
    return null;
  } // split out the file folders; filter out any empty or white-space-only strings


  var folders = filePath.split('/').filter(function (folderName) {
    return folderName.replace(/\s/g, '').length;
  }); // check for the component corresponding to file path in the site config object

  var component = getDeepestChildValue(customViews, folders);

  if (component) {
    console.log('found custom component for', filePath);
    return component;
  } else {
    console.log('no custom component for', filePath);
    return null;
  }
};

exports.dynamicImport = dynamicImport;