const { resolve } = require('path');
const WWW_SPEECH_ROOT = resolve(process.cwd());

module.exports = () => {
  let moduleAliases = {};
  // default aliases
  moduleAliases['@config'] = resolve(WWW_SPEECH_ROOT, 'config');
  moduleAliases['@public'] = resolve(WWW_SPEECH_ROOT, 'public');
  // return finished aliases
  return moduleAliases;
};
