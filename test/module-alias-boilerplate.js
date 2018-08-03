// set up aliases
const moduleAlias = require('module-alias');
const customAliases = require('../utils/createModuleAliases.js')();
moduleAlias.addAliases(customAliases);
