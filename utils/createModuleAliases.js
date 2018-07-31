const { statSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const DEFAULT_ROOT = 'client/build';
const CUSTOM_ROOT = 'client_custom/build';

const getFolders = path => {
  if (existsSync(path)) {
    return readdirSync(path).filter(file => statSync(join(path, file)).isDirectory());
  }
  return [];
};

const addAlliasesForFolder = (name, aliasObject) => { // components
  const folderPath = resolve(`${CUSTOM_ROOT}/${name}`);
  const components = getFolders(folderPath);
  for (let i = 0; i < components.length; i++) {
    let folderName = components[i];
    let aliasName = `@${name}/${folderName}`;
    let aliasPath = resolve(`${CUSTOM_ROOT}/${name}/${folderName}/index.js`);
    aliasObject[aliasName] = aliasPath;
  }
  return aliasObject;
};

module.exports = () => {
  let moduleAliases = {};
  // aliases for configs
  moduleAliases['@config'] = resolve(`config`);

  // create specific aliases for locally defined components
  moduleAliases = addAlliasesForFolder('containers', moduleAliases);
  moduleAliases = addAlliasesForFolder('components', moduleAliases);
  moduleAliases = addAlliasesForFolder('pages', moduleAliases);

  // default aliases
  moduleAliases['@containers'] = resolve(`${DEFAULT_ROOT}/containers`);
  moduleAliases['@components'] = resolve(`${DEFAULT_ROOT}/components`);
  moduleAliases['@pages'] = resolve(`${DEFAULT_ROOT}/pages`);
  moduleAliases['@actions'] = resolve(`${DEFAULT_ROOT}/actions`);
  moduleAliases['@reducers'] = resolve(`${DEFAULT_ROOT}/reducers`);
  moduleAliases['@sagas'] = resolve(`${DEFAULT_ROOT}/sagas`);
  moduleAliases['@app'] = resolve(`${DEFAULT_ROOT}/app.js`);

  // return finished aliases
  return moduleAliases;
};
