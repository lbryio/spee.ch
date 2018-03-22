const Path = require('path');
const importSubModules = require('build/utils/importSubModules');
const thisFolder = Path.resolve(__dirname, 'client/containers/');
module.exports = importSubModules(thisFolder);
