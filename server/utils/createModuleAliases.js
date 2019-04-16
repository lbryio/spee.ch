import { resolve } from 'path';
const WWW_SPEECH_ROOT = resolve(process.cwd());

export default () => {
  let moduleAliases = {};
  // default aliases
  moduleAliases['@config'] = resolve(WWW_SPEECH_ROOT, 'config');
  moduleAliases['@public'] = resolve(WWW_SPEECH_ROOT, 'public');
  // return finished aliases
  return moduleAliases;
};
