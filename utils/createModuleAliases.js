const { statSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const DEFAULT_ROOT = 'client/build';
const CUSTOM_ROOT = 'site/custom/build';
const DEFAULT_SCSS_ROOT = 'client/scss';
const CUSTOM_SCSS_ROOT = 'site/custom/scss';

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

module.exports = () => {
  let moduleAliases = {};

  moduleAliases['chainquery'] = resolve('./server/chainquery/bundle');
  moduleAliases['server'] = resolve('./server');

  // aliases for configs
  moduleAliases['@config'] = resolve('site/config');
  moduleAliases['@private'] = resolve('site/private');

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

  // return finished aliases
  return moduleAliases;
};
