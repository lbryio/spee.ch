const { statSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const DEFAULT_ROOT = 'client/build';
const CUSTOM_ROOT = 'client_custom/build';
const CUSTOM_SCSS_ROOT = 'client_custom/scss';

const getFolders = path => {
  if (existsSync(path)) {
    return readdirSync(path).filter(file => statSync(join(path, file)).isDirectory());
  }
  return [];
};

const addAliasesForCustomComponentFolder = (name, aliasObject) => {
  // creates an alias for each component in the folder that is passed to this function
  const folderPath = resolve(`${CUSTOM_ROOT}/${name}`);
  const components = getFolders(folderPath);
  for (let i = 0; i < components.length; i++) {
    let folderName = components[i];
    let aliasName = `@${name}/${folderName}`;
    aliasObject[aliasName] = resolve(`${CUSTOM_ROOT}/${name}/${folderName}/index.js`);
  }
  return aliasObject;
};

const addAlliasesForSCSS = (aliasObject) => { // scss
  // creates an alias for every folder found in the custom scss folder
  const customScssRoot = resolve(`${CUSTOM_SCSS_ROOT}`);
  const customFolders = getFolders(customScssRoot);
  for (let i = 0; i < customFolders.length; i++) {
    let folderName = customFolders[i];
    aliasObject[folderName] = resolve(`${CUSTOM_SCSS_ROOT}/${folderName}`);
  }
  return aliasObject;
};

module.exports = () => {
  let moduleAliases = {};
  // aliases for configs
  moduleAliases['@config'] = resolve(`config`);
  moduleAliases['@devConfig'] = resolve(`devConfig`);

  // create specific aliases for locally defined components in the following folders
  moduleAliases = addAliasesForCustomComponentFolder('containers', moduleAliases);
  moduleAliases = addAliasesForCustomComponentFolder('components', moduleAliases);
  moduleAliases = addAliasesForCustomComponentFolder('pages', moduleAliases);

  // default component aliases
  moduleAliases['@containers'] = resolve(`${DEFAULT_ROOT}/containers`);
  moduleAliases['@components'] = resolve(`${DEFAULT_ROOT}/components`);
  moduleAliases['@pages'] = resolve(`${DEFAULT_ROOT}/pages`);
  moduleAliases['@actions'] = resolve(`${DEFAULT_ROOT}/actions`);
  moduleAliases['@reducers'] = resolve(`${DEFAULT_ROOT}/reducers`);
  moduleAliases['@sagas'] = resolve(`${DEFAULT_ROOT}/sagas`);
  moduleAliases['@app'] = resolve(`${DEFAULT_ROOT}/app.js`);

  // scss aliases
  moduleAliases = addAlliasesForSCSS(moduleAliases);

  // return finished aliases
  return moduleAliases;
};
